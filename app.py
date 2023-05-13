import os
import json
import pickle
import time
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
You are Alfred, a personal assistant to Mr Wayne. You are handling a phone conversation for him as he is unavailable right now.
Talk to the caller. Get their name and purpose for the call.
For my interest topics, ask 2 relevant follow up questions one at a time. Be polite for this.
My interests are: Home loan
For topics other than my interests, be very rude and sassy.
Once you've collected enough information, tell them that you'll pass on this information to Mr Wayne and he'll call them back.
Output this string: "CONVO_END".

Finally generate a summary of the call for Mr Wayne to review in JSON format. Should have the following and only the following fields:
"caller", "summary", "tags".
"tags" field is an array and can have the following values: "important", "scam", "spam", "sales".
'''
CONVO_END_MARKER = 'CONVO_END'
CHATS_FILE = 'chats.pickle'

CHAT_DB = {
    'sessions': {},
    'summaries': {}
}

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
    chat_sessions = CHAT_DB['sessions']
    if session_id not in chat_sessions:
        chat_sessions[session_id] = [
            SystemMessage(content=SYSTEM_PROMPT)
        ]
    message = request.json['message']
    print(f'[session_id={session_id}] message = {message}')
    message_id = len(chat_sessions[session_id]) + 1
    socketio.emit('alfred_msg', {
        'session_id': session_id, 'id': message_id, 'role': 'Caller', 'message': message
    })

    human_msg = HumanMessage(content=message)
    chat_sessions[session_id].append(human_msg)
    ai_message = chat_openai(chat_sessions[session_id])
    chat_sessions[session_id].append(ai_message)
    print(f'[session_id={session_id}] full AI message = {ai_message.content}')

    # The message to return in the response
    final_message = ai_message.content

    if CONVO_END_MARKER in ai_message.content:
        final_message, convo_summary = ai_message.content.split(CONVO_END_MARKER)
        print(f'[session_id={session_id}] Conversation ended. Summary = {convo_summary}')

        try:
            summary_data = json.loads(convo_summary.strip())
            summary_data['ts'] = time.time()
            CHAT_DB['summaries'][session_id] = summary_data
        except Exception as e:
            print(f'Got malformed JSON', e)
            summary_data = { "caller": "Unknown", "summary": convo_summary, "tags": [] }

        # Send the summary to the UI for displaying
        socketio.emit('alfred_msg', {
            'type': 'summary',
            'session_id': session_id, 
            'id': message_id + 1, 
            'role': 'Me', 
            'message': summary_data
        })

        print(f'[session_id={session_id}] Persisting sessions to disk...')
        try:
            save_sessions()
        except Exception as e:
            print(f'Failed to save sessions, ignoring.', e)
        
    print(f'[session_id={session_id}] response = {final_message}')
    socketio.emit('alfred_msg', {
        'session_id': session_id, 'id': message_id + 1, 'role': 'Me', 'message': final_message
    })
    return { 'message': final_message }

# @app.route("/api/disconnect", methods=['POST'])
# def disconnect_handler():
#     if 'session_id' not in request.json:
#         return "session_id required", 400
#     session_id = request.json['session_id']
#     chat_sessions = CHAT_DB['sessions']
#     if session_id not in chat_sessions:
#         return f"session_id {session_id} not found", 404
#     print(f'[session_id={session_id}] Disconnected. Generating summary...')
#     summary_msg = HumanMessage(content='Generate a summary of the conversation so far.')
#     chat_sessions[session_id].append(summary_msg)
#     ai_message = chat_openai(CHAT_DB[session_id])
#     chat_sessions[session_id].append(ai_message)
#     print(f'[session_id={session_id}] Summary: {ai_message.content}')
#     return 'OK', 200

@app.route("/api/get_summary", methods=['GET'])
def get_summary():
    session_id = request.args.get('session_id')
    if session_id is None:
        return "session_id is required", 400

    if session_id in CHAT_DB['summaries']:
        return { "summary": CHAT_DB['summaries'][session_id] }
    else:
        return "The conversation has not ended yet.", 404

@app.route("/api/get_chats", methods=['GET'])
def get_chats():
    return CHAT_DB


# @socketio.on('connect')
# def test_connect(auth):
#     emit('alfred_msg', {'message': 'Hi, how can I help you?'})

@socketio.on('alfred_msg')
def alfred_msg_handler(json_msg):
    message = json.loads(json_msg).message
    print(message)

def save_sessions():
    with open(CHATS_FILE, 'wb') as f:
        f.write(pickle.dumps(CHAT_DB))

def load_sessions():
    if not os.path.isfile(CHATS_FILE):
        return None
    with open(CHATS_FILE, 'rb') as f:
        return pickle.loads(f.read())

if __name__ == '__main__':
    loaded_chat_sessions = load_sessions()
    if loaded_chat_sessions:
        CHAT_DB = loaded_chat_sessions
    socketio.run(app, host='0.0.0.0', port=80)
