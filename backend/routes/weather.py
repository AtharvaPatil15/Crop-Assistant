from flask import Blueprint, request, jsonify
import requests

weather_bp = Blueprint('weather', __name__)

@weather_bp.route('/weather', methods=['GET'])
def get_weather():
    location = request.args.get('location')
    if not location:
        return jsonify({'error': 'Location parameter is required'}), 400

    # Here you would typically call an external weather API
    # For demonstration, we will return mocked data
    weather_data = {
        'location': location,
        'temperature': '25°C',
        'humidity': '60%',
        'condition': 'Sunny'
    }

    return jsonify(weather_data)