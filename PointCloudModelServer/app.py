from flask import Flask, jsonify, request
app = Flask(__name__)

# ------------------------------ CORS ----------------------------------

# Define the allowed origins (localhost)
allowed_origins = ["http://localhost:4200"]

# Function to check if the origin is allowed
def is_origin_allowed(origin):
    return origin in allowed_origins

# handles CORS blockage
@app.after_request
def add_cors_headers(response):
    origin = request.headers.get('Origin')
    if is_origin_allowed(origin):
        response.headers['Access-Control-Allow-Origin'] = origin
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    return response


# ------------------------------ API ----------------------------------

@app.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({'message': 'Hello, Angular! From: Python'})

if __name__ == '__main__':
    app.run()