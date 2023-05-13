from flask import Flask, send_from_directory, send_file

app = Flask(__name__, static_url_path='', static_folder='web/static')

@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.route("/hello")
def hello_world():
    return "<p>Hello, World!</p>"
