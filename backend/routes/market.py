from flask import Blueprint, jsonify

market_bp = Blueprint('market', __name__)

@market_bp.route('/market-prices', methods=['GET'])
def get_market_prices():
    # Mocked market prices for demonstration purposes
    prices = {
        "corn": 5.00,
        "wheat": 4.50,
        "rice": 3.75,
        "soybeans": 6.25
    }
    return jsonify(prices)