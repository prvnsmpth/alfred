from flask import Flask, send_from_directory, send_file
from flask_socketio import SocketIO, send, emit

app = Flask(__name__, static_url_path='', static_folder='web/build')
socketio = SocketIO(app)

@app.route("/")
@app.route("/<page>")
def index(page=None):
    return app.send_static_file('index.html')

@app.route("/hello")
def hello_world():
    return "<p>Hello, World!</p>"

@socketio.on('connect')
def test_connect(auth):
    emit('alfred_msg', {'data': 'Connected'})

if __name__ == '__main__':
    socketio.run(app)
