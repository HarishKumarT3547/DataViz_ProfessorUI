from flask import Flask, jsonify, request, send_file
from PIL import Image, ImageDraw
import os
import csv

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

# simple get function to test connection between angular to python
@app.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({'message': 'Hello, Angular! From: Python'})

# post function that takes in a csv file and returns a generated model image
@app.route('/upload', methods=['POST'])
def upload_csv():
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        
        # temporarily save the uploaded file locally
        uploaded_file.save('temp_upload.csv')
        
        # read and process CSV
        points = []
        with open('temp_upload.csv', 'r') as file:
            csv_reader = csv.reader(file)
            for row in csv_reader:
                if len(row) == 3:
                    points.append([float(row[0]), float(row[1]), float(row[2])])
        
        
         # generate a simple image (for now, I create a simple 2D scatter plot using x and y values from the csv)
        img = Image.new('RGB', (800, 600), color='black')
        draw = ImageDraw.Draw(img)
        for point in points:
            x, y, z = point
            x = int((x+8) * 50) # scale the points to fit the image dimensions
            y = int((y+6) * 50)
            draw.point((x, y), fill='yellow')

        # save and send the image file back to angular
        img.save('temp_image.png')
        response = send_file('temp_image.png', mimetype='image/png')
        
        # TODO: need to delete temporary image file somehow after sending back to angular client...
        # os.remove('temp_image.png') 
        os.remove('temp_upload.csv')

        return response

    else:
        return jsonify({"error": "No file uploaded"})
   
if __name__ == '__main__':
    app.run()