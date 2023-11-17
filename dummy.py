from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
from decouple import Config, Csv
import datetime
import json

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

config = Config()
config.read('environment.env')
jwt_key = config('JWT_SECRET_KEY')
app.config['SECRET_KEY'] = jwt_key
# Generate a JWT token on login


def generate_token(username, jwt_key):
    # Check if a token already exists
    existing_token = request.headers.get('Authorization')

    if existing_token:
        payload = verify_token(existing_token, jwt_key)

        # If the existing token is still valid, return it
        if payload:
            return existing_token

    # Generate a new token with a longer expiration time
    payload = {
        'username': username,
        # 30 minutes, adjust as needed
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    }
    token = jwt.encode(payload, jwt_key, algorithm='HS256')
    return token


# Verify the token on each request


def verify_token(token, jwt_key):
    try:
        payload = jwt.decode(token, jwt_key, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        # Token has expired
        return None
    except jwt.DecodeError:
        # Token is invalid
        return None

# Store submitted URLs in a data.json file


def store_url(url):
    try:
        with open('data.json', 'r') as file:
            data = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        data = []

    data.append(url)

    with open('data.json', 'w') as file:
        json.dump(data, file)


@app.route('/login', methods=['POST'])
def login():
    # Get username and password from the request
    data = request.json
    username = data.get('username')
    password = data.get('password')

    print(f"Received data - Username: {username}, Password: {password}")

    # Check username and password (replace with your validation logic)
    if username == 'Arun' and password == '1234':
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': 'Login failed'})


@app.route('/storeURL', methods=['POST'])
def store_url_endpoint():
    data = request.json
    url = data.get('url')

    if url:
        store_url(url)
        return jsonify({'success': True, 'message': 'URL stored successfully'})
    else:
        return jsonify({'success': False, 'message': 'URL submission failed'})


@app.route('/reddit', methods=['GET'])
def get_reddit_data():
    # Fetch Reddit data using Python requests or a Reddit API library
    # Return the data as JSON (replace with actual Reddit data)
    reddit_data = {'data': 'Reddit data here'}
    return jsonify(reddit_data)


@app.route('/')
def index():
    return 'HELLO'


if __name__ == '__main__':
    app.run(port=5000)
