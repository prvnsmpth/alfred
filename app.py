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

chat_history = [
    SystemMessage(
        content='You are a butler specializing in handling phone calls')
]

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
    message = request.json['message']
    print('Received message: ' + message)
    human_msg = HumanMessage(content=message)
    chat_history.append(human_msg)
    ai_message = chat_openai(chat_history)
    chat_history.append(ai_message)
    return { 'message': ai_message.content }

@socketio.on('connect')
def test_connect(auth):
    emit('alfred_msg', {'message': 'Hi, how can I help you?'})

@socketio.on('alfred_msg')
def alfred_msg_handler(json_msg):
    message = json.loads(json_msg).message
    print(message)

if __name__ == '__main__':
    socketio.run(app)
