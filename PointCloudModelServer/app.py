from flask import Flask, jsonify, request, send_file
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

# TODO: replace the following code with generating point cloud

# Create yellow box png
from PIL import Image
def generate_png_image():
    image = Image.new("RGB", (250, 250), "yellow")
    image_path = "temp_image.png"
    image.save(image_path)
    return image_path

@app.route('/generate_image', methods=['GET'])
def generate_image():
    try:
        # Generate and return the PNG image
        image_path = generate_png_image()
        return send_file(image_path, mimetype='image/png')
    except Exception as e:
        return str(e), 500
    
if __name__ == '__main__':
    app.run()