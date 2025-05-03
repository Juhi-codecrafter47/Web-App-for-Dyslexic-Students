from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io
import base64
import pytesseract
from spellchecker import SpellChecker

app = Flask(__name__)
CORS(app)
model = load_model('dyslexia_model.keras')


def preprocess_image(image):
    image = image.resize((224, 224))  # Resize to match model input
    image = image.convert('RGB')  # Ensure it has 3 channels (RGB)
    image_array = np.array(image).astype('float32') / 255.0
    image_array = image_array.reshape(1, 224, 224, 3)  # (batch, height, width, channels)
    return image_array


def preprocess_annotations(annotations):
    # Example logic: convert specific annotations to fixed features
    features = {
        "misspelled": 0,
        "b/d confusion": 0,
        "word skipping": 0,
        "repetition": 0,
        "mirror writing": 0
    }

    # Check presence of certain keywords
    for ann in annotations:
        ann = ann.lower()
        if "misspell" in ann:
            features["misspelled"] = 1
        if "b" in ann and "d" in ann:
            features["b/d confusion"] = 1
        if "skip" in ann:
            features["word skipping"] = 1
        if "repeat" in ann:
            features["repetition"] = 1
        if "mirror" in ann:
            features["mirror writing"] = 1

    return np.array([list(features.values())], dtype=np.float32)  # shape (1, 5)

spell = SpellChecker()

def detect_spelling_errors_from_image(image):
    # Extract text using OCR
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    text = pytesseract.image_to_string(image)

    # Split text into words and check for misspelled ones
    words = text.split()
    misspelled = spell.unknown(words)

    return list(misspelled)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json['input']
        image_data = base64.b64decode(input_data['image'])
        annotations = input_data.get('annotations', [])

        image = Image.open(io.BytesIO(image_data)).convert('RGB')  # RGB if model expects 3 channels
        image = image.resize((224, 224))  # Adjusted to model input size
        image_array = np.array(image).astype('float32') / 255.0
        image_array = image_array.reshape(1, 224, 224, 3)

        # Preprocess annotations (convert to 5 float features)
        annotation_vector = preprocess_annotations(annotations)  # shape (1, 5)

        prediction = model.predict([image_array, annotation_vector])
        ocr_errors = detect_spelling_errors_from_image(image)

        return jsonify({
         'prediction': float(prediction[0][0]),
         'annotations_used': annotations,
         'detected_errors': ocr_errors
        })
    except Exception as e:
        return jsonify({'error': str(e)})



if __name__ == '__main__':
    app.run(port=5001, debug=True)
