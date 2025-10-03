from flask import Blueprint, request, jsonify
import torch
from torchvision import transforms
from PIL import Image
import io
from backend.utils.image_processing import preprocess_image
from backend.utils.api_helpers import format_response

diagnose_bp = Blueprint('diagnose', __name__)

# Load the trained model
model = torch.load('backend/model/crop_disease_model.pt')
model.eval()

@diagnose_bp.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        image = Image.open(io.BytesIO(file.read()))
        processed_image = preprocess_image(image)

        with torch.no_grad():
            output = model(processed_image)
            confidence, predicted_class = torch.max(output, 1)

        response = format_response(predicted_class.item(), confidence.item())
        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)}), 500