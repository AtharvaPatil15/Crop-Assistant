import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import DiagnosisResult from './components/DiagnosisResult';
import WeatherInfo from './components/WeatherInfo';
import MarketPrices from './components/MarketPrices';
import './App.css';

function App() {
    const [diagnosis, setDiagnosis] = useState(null);
    const [weather, setWeather] = useState(null);
    const [marketPrices, setMarketPrices] = useState(null);

    const handleDiagnosis = (result) => {
        setDiagnosis(result);
    };

    const handleWeather = (data) => {
        setWeather(data);
    };

    const handleMarketPrices = (prices) => {
        setMarketPrices(prices);
    };

    return (
        <div className="App">
            <h1>Crop Assistant</h1>
            <ImageUpload onDiagnosis={handleDiagnosis} />
            {diagnosis && <DiagnosisResult diagnosis={diagnosis} />}
            {weather && <WeatherInfo weather={weather} />}
            {marketPrices && <MarketPrices prices={marketPrices} />}
        </div>
    );
}

export default App;