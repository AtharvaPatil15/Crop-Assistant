from flask import Flask
from flask_cors import CORS
from routes.diagnose import diagnose_bp
from routes.weather import weather_bp
from routes.market import market_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(diagnose_bp, url_prefix='/api')
app.register_blueprint(weather_bp, url_prefix='/api')
app.register_blueprint(market_bp, url_prefix='/api')

@app.route('/')
def home():
    return "Welcome to the Crop Assistant API!"

if __name__ == '__main__':
    app.run(debug=True)