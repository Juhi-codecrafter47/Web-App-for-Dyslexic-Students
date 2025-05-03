from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import joblib

app = Flask(__name__)
CORS(app)

# Load your trained models
mlp_model = joblib.load('Trained_H_Model.pkl')

# Feature extraction function (replace with your actual feature extraction)
def Feature_extraction(image):
    resized_image = cv2.resize(image, (7, 7))  # Resize image to 128x128
    feature_vector = resized_image.flatten()  # Flatten the image into a 1D array
    feature_vector = feature_vector[:31]
    return feature_vector

# Route to handle image upload and predict
@app.route('/')
def index():
    return '''
        <!doctype html>
        <title>Upload an Image</title>
        <h1>Upload an Image for Prediction</h1>
        <form method="post" action="/upload" enctype="multipart/form-data">
            <input type="file" name="file">
            <input type="submit" value="Upload">
        </form>
    '''

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Convert the uploaded file to a format OpenCV can work with
    image_array = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(image_array, cv2.IMREAD_GRAYSCALE)

    if img is None:
        return jsonify({'error': 'Unable to decode the image'}), 400

    # Extract features from the image
    features = Feature_extraction(img)

    # Make predictions using the MLP model
    mlp_prediction = mlp_model.predict([features])
   
    return jsonify({
        'mlp_prediction': int(mlp_prediction[0])
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)
    
