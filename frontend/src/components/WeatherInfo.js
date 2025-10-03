import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherInfo = ({ location }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(`/api/weather?location=${location}`);
                setWeather(response.data);
            } catch (err) {
                setError('Failed to fetch weather data');
            } finally {
                setLoading(false);
            }
        };

        if (location) {
            fetchWeather();
        }
    }, [location]);

    if (loading) {
        return <div>Loading weather information...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Weather Information</h2>
            {weather ? (
                <div>
                    <p>Temperature: {weather.temperature}°C</p>
                    <p>Condition: {weather.condition}</p>
                    <p>Humidity: {weather.humidity}%</p>
                    <p>Wind Speed: {weather.windSpeed} km/h</p>
                </div>
            ) : (
                <p>No weather data available.</p>
            )}
        </div>
    );
};

export default WeatherInfo;