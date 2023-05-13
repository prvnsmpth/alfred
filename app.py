import json
from flask import Flask, send_from_directory, send_file, request
from flask_socketio import SocketIO, send, emit

from langchain.chat_models import ChatOpenAI
from langchain.schema import (
    AIMessage,
    HumanMessage,
    SystemMessage
)

chat_openai = ChatOpenAI(model_name="gpt-3.5-turbo")

SYSTEM_PROMPT = '''
You are a personal assistant to Pankaj. You are handling a phone conversation for him as he is unavailable right now.
Talk to the caller. Get their name and purpose for the call.
For my interest topics, ask some relevant follow up questions. Be polite for this.
My interests are: Home loan
For topics other than my interests, be very rude and sassy.
Once you've collected enough information, tell them that you'll pass on this information to Pankaj and he'll call them back.
Output this string: "CONVO_END".
Finally generate a summary of the call for Pankaj to review.
'''
CONVO_END_MARKER = 'CONVO_END'

chat_sessions = {}

app = Flask(__name__, static_url_path='', static_folder='web/build')
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
@app.route("/<page>", methods=['GET'])
def index(page=None):
    return app.send_static_file('index.html')

@app.route("/hello")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/message", methods=['POST'])
def message_handler():
    if 'session_id' not in request.json:
        return "session_id required", 400
    session_id = request.json['session_id']
    if session_id not in chat_sessions:
        chat_sessions[session_id] = [
            SystemMessage(content=SYSTEM_PROMPT)
        ]
    message = request.json['message']
    print(f'[session_id={session_id}] message = {message}')
    message_id = len(chat_sessions[session_id]) + 1
    socketio.emit('alfred_msg', { 'id': message_id, 'role': 'user', 'message': message })

    human_msg = HumanMessage(content=message)
    chat_sessions[session_id].append(human_msg)
    ai_message = chat_openai(chat_sessions[session_id])
    chat_sessions[session_id].append(ai_message)
    socketio.emit('alfred_msg', { 'id': message_id + 1, 'role': 'assistant', 'message': ai_message.content })
    return { 'message': ai_message.content }

@app.route("/api/disconnect", methods=['POST'])
def disconnect_handler():
    if 'session_id' not in request.json:
        return "session_id required", 400
    session_id = request.json['session_id']
    if session_id not in chat_sessions:
        return f"session_id {session_id} not found", 404
    print(f'[session_id={session_id}] Disconnected. Generating summary...')
    summary_msg = HumanMessage(content='Generate a summary of the conversation so far.')
    chat_sessions[session_id].append(summary_msg)
    ai_message = chat_openai(chat_sessions[session_id])
    chat_sessions[session_id].append(ai_message)
    print(f'[session_id={session_id}] Summary: {ai_message.content}')
    return 'OK', 200

# @app.route("/api/get_summary", methods=['GET'])
# def get_summary():
#     session_id = request.args.get('session_id')
#     if session_id is None:
#         return "session_id is required", 400
#
#     last_message = chat_sessions[session_id][-1]
#     if CONVO_END_MARKER in last_message:
#         summary = last_message.split(CONVO_END_MARKER)[-1]
#         return { "summary": summary }
#     else:
#         return "The conversation has not ended yet.", 404

@socketio.on('connect')
def test_connect(auth):
    emit('alfred_msg', {'message': 'Hi, how can I help you?'})

@socketio.on('alfred_msg')
def alfred_msg_handler(json_msg):
    message = json.loads(json_msg).message
    print(message)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=80)
