import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Adjust the base URL as needed

export const diagnoseCrop = async (imageData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/predict`, imageData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error diagnosing crop:', error);
        throw error;
    }
};

export const fetchMarketPrices = async (cropName) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/market?crop=${cropName}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching market prices:', error);
        throw error;
    }
};

export const fetchWeatherInfo = async (location) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/weather?location=${location}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather information:', error);
        throw error;
    }
};