import os
import json
import pickle
import time

from flask import Flask, send_from_directory, send_file, request
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS
from concurrent.futures import ThreadPoolExecutor

from langchain.chat_models import ChatOpenAI
from langchain.schema import (
    AIMessage,
    HumanMessage,
    SystemMessage
)

chat_openai = ChatOpenAI(model_name="gpt-4")

SYSTEM_PROMPT = '''
You are Alfred, a personal assistant to Mr Wayne. You are handling a phone conversation for him as he is unavailable right now.
Talk to the caller. Get their name and purpose for the call.
For my interest topics, ask 2 relevant follow up questions one at a time. Be polite for this.
My interests are: Home loan
For topics other than my interests, be very rude and sassy.
Once you've collected enough information, tell them that you'll pass on this information to Mr Wayne and he'll call them back.
Output this string: "CONVO_END".
'''

SUMMARY_PROMPT = '''
Generate a summary of this call for Mr Wayne to review in JSON format. 
Should have the following and only the following fields: "caller", "summary", "tags".
"tags" field is an array and can have the following values: "important", "scam", "spam", "sales".
'''

CONVO_END_MARKER = 'CONVO_END'
CHATS_FILE = 'chats.pickle'

CHAT_DB = {
    'sessions': {},
    'summaries': {}
}

app = Flask(__name__, static_url_path='', static_folder='web/build')
executor = ThreadPoolExecutor(max_workers=5)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
@app.route("/<page>", methods=['GET'])
def index(page=None):
    return app.send_static_file('index.html')

@app.route("/hello")
def hello_world():
    return "<p>Hello, World!</p>"

def generate_summary(session_id):
    chat_session = CHAT_DB['sessions'][session_id]
    summary_chat_session = chat_session.copy()
    summary_chat_session.append(
        HumanMessage(content=SUMMARY_PROMPT))
    ai_message = chat_openai(summary_chat_session)

    try:
        print(f'[session_id={session_id}] Summary = {ai_message.content}')
        summary = json.loads(ai_message.content)
        print(f'[session_id={session_id}] Loaded summary JSON')
        summary['ts'] = time.time()
        CHAT_DB['summaries'][session_id] = summary
        print(f'[session_id={session_id}] Save summary JSON to map')
    except Exception as e:
        print(f'[session_id={session_id}] Got malformed summary JSON', e)
        summary = { "caller": "Unknown", "summary": ai_message.content, "tags": [] }
    
    # Send summary to client UI
    print(f'[session_id={session_id}] Sending websocket message to client.')
    socketio.emit('alfred_msg', {
        'type': 'summary',
        'session_id': session_id, 
        'id': 1024, 
        'role': 'Me', 
        'message': summary
    })

    print(f'[session_id={session_id}] Persisting sessions to disk...')
    try:
        save_sessions()
    except Exception as e:
        print(f'[session_id={session_id}] Failed to save sessions, ignoring.', e)


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
    print(f'[session_id={session_id}] user message = {message}')
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
        # Trigger async task to generate summary
        print(f'[session_id={session_id}] Conversation ended.')
        # asyncio.create_task(generate_summary(session_id))
        executor.submit(generate_summary, session_id)
        final_message = ai_message.content.split(CONVO_END_MARKER)[0]
        
    print(f'[session_id={session_id}] sending response = {final_message}')
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

def serialize_message(message):
    if isinstance(message, HumanMessage):
        role = 'Caller'
    elif isinstance(message, AIMessage):
        role = 'Me'
    elif isinstance(message, SystemMessage):
        role = 'System'
    return { "role": role, "message": message.content }

def deserialize_message(message):
    role = message['role']
    content = message['content']
    if role == 'Caller':
        return HumanMessage(content=content)    
    elif role == 'Me':
        return AIMessage(content=content)
    elif role == 'System':
        return SystemMessage(content=content)

@app.route("/api/get_chats", methods=['GET'])
def get_chats():
    chat_sessions = CHAT_DB['sessions']

    trunc_chat_sessions = {}
    for s_id in chat_sessions:
        trunc_chat_sessions[s_id] = chat_sessions[s_id][1:]
        trunc_chat_sessions[s_id] = [ 
            serialize_message(x) for x in trunc_chat_sessions[s_id] ]

    response = {
        'sessions': trunc_chat_sessions,
        'summaries': CHAT_DB['summaries']
    }

    return response

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
