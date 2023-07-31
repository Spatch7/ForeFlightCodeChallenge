

from flask import Flask, jsonify

app = Flask(__name__, static_folder='./build', static_url_path='/')


@app.route('/api/hello')
def hello():
    return jsonify(message='Hello World!')

