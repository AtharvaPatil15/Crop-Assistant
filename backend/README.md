# Crop Assistant Backend

## Overview
The Crop Assistant backend is built using Flask and PyTorch to provide an API for diagnosing crop diseases from images, fetching local weather information, and displaying nearest market prices for crops.

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd crop-assistant/backend
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Run the application:**
   ```
   python app.py
   ```

   The server will start on `http://127.0.0.1:5000`.

## API Endpoints

### 1. Diagnose Crop Disease
- **Endpoint:** `/predict`
- **Method:** POST
- **Description:** Accepts an image of a crop and returns the diagnosed disease along with confidence level and treatment steps.
- **Request Body:** 
  - `image`: (file) The image of the crop.

### 2. Get Weather Information
- **Endpoint:** `/weather`
- **Method:** GET
- **Description:** Returns the current weather information based on the user's location.
- **Query Parameters:**
  - `location`: (string) The location for which to fetch weather data.

### 3. Get Market Prices
- **Endpoint:** `/market`
- **Method:** GET
- **Description:** Returns the current market prices for crops.
- **Query Parameters:**
  - `crop`: (string) The type of crop to get market prices for.

## Usage Examples

### Diagnose Crop Disease
```bash
curl -X POST -F "image=@path_to_image.jpg" http://127.0.0.1:5000/predict
```

### Get Weather Information
```bash
curl http://127.0.0.1:5000/weather?location=your_location
```

### Get Market Prices
```bash
curl http://127.0.0.1:5000/market?crop=corn
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.