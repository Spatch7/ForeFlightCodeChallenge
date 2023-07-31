

import os
import time
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder='./build', static_url_path='/')
# app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/hello')
def hello():
    return jsonify(message='Hello World!')

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}



# if __name__ == '__main__':
#     port = int(os.environ.get("PORT", 5000))
#     app.run(host='0.0.0.0', port=port)