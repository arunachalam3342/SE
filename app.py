from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")


def store_url(data):
    username = data.get('username')
    url = data.get('url')
    result = "Safe"

    user_file_path = f"history/{username}_data.json"

    try:
        with open(user_file_path, 'r') as file:
            user_data = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        user_data = []

    user_data.append({
    'username': username,
    'url': url,
    'result': result
})


    with open(user_file_path, 'w') as file:
        json.dump(user_data, file)


@app.route('/storeURL', methods=['POST'])
def store_url_endpoint():
    data = request.json
    url = data.get('url')
    username = data.get('username')

    if url and username:
        data_to_store = {
            'username': username,
            'url': url
        }
        store_url(data_to_store)
        return jsonify({'success': True, 'message': 'URL stored successfully'})
    else:
        return jsonify({'success': False, 'message': 'URL submission failed'})


@app.route('/getHistory', methods=['GET'])
def get_history():
    username = request.args.get('username')
    
    if username:
        user_file_path = f"history/{username}_data.json"
        default_file_path = "history/data.json"

        if os.path.exists(user_file_path):
            file_path = user_file_path
        else:
            file_path = default_file_path

        try:
            with open(file_path, 'r') as file:
                history_data = json.load(file)
            return jsonify(history_data)
        except (FileNotFoundError, json.JSONDecodeError):
            return jsonify([])
    else:
        return jsonify({'success': False, 'message': 'Username not provided'})


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

   

    valid_users = {
        'Arun': '1234',
        'Sai': '5678',
        'GnanaBharathi': '5555'
    }

    if username in valid_users and password == valid_users[username]:
        response_data = {'success': True, 'message': 'Login successful', 'username': username}
        return jsonify(response_data)
    else:
        return jsonify({'success': False, 'message': 'Login failed'})





@app.route('/')
def index():
    return 'Backend Connected'


if __name__ == '__main__':
    if not os.path.exists('history'):
        os.makedirs('history')
    app.run(port=5000)
