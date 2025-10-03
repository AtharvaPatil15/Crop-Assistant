# Crop Assistant Frontend

## Overview
Crop Assistant is a web application designed to help farmers diagnose crop diseases through image analysis, provide treatment steps, display local weather information, and show nearest market prices for crops. The application is built using React for the frontend and Flask with PyTorch for the backend.

## Features
- **Image Diagnosis**: Upload images of crops to diagnose diseases using a trained PyTorch model.
- **Confidence Levels**: Get confidence scores for the diagnosis to understand the reliability of the results.
- **Treatment Steps**: Receive recommended treatment steps based on the diagnosed disease.
- **Weather Information**: View local weather conditions relevant to crop management.
- **Market Prices**: Access current market prices for diagnosed crops to make informed selling decisions.

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd crop-assistant/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application
To start the development server, run:
```
npm start
```
This will launch the application in your default web browser at `http://localhost:3000`.

### API Integration
The frontend communicates with the backend API for diagnosis, weather, and market price information. Ensure the backend server is running and accessible.

## Folder Structure
- `public/`: Contains static files like `index.html`.
- `src/`: Contains the React components and services.
  - `components/`: UI components for image upload, diagnosis results, weather info, and market prices.
  - `services/`: Functions for API calls and weather data fetching.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.