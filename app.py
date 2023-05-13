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
You are a butler specializing in handling phone calls.
'''

chat_sessions = {}

app = Flask(__name__, static_url_path='', static_folder='web/build')
socketio = SocketIO(app)

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
    human_msg = HumanMessage(content=message)
    chat_sessions[session_id].append(human_msg)
    ai_message = chat_openai(chat_sessions[session_id])
    chat_sessions[session_id].append(ai_message)
    return { 'message': ai_message.content }

@socketio.on('connect')
def test_connect(auth):
    emit('alfred_msg', {'message': 'Hi, how can I help you?'})

@socketio.on('alfred_msg')
def alfred_msg_handler(json_msg):
    message = json.loads(json_msg).message
    print(message)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=80)
