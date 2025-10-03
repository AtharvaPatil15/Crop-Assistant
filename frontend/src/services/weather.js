import axios from 'axios';

const API_URL = 'http://localhost:5000/weather'; // Adjust the URL as needed

export const fetchWeather = async (location) => {
    try {
        const response = await axios.get(`${API_URL}?location=${location}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};