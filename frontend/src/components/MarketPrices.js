import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MarketPrices = ({ crop }) => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarketPrices = async () => {
            try {
                const response = await axios.get(`/api/market?crop=${crop}`);
                setPrices(response.data.prices);
            } catch (err) {
                setError('Error fetching market prices');
            } finally {
                setLoading(false);
            }
        };

        if (crop) {
            fetchMarketPrices();
        }
    }, [crop]);

    if (loading) {
        return <div>Loading market prices...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h3>Market Prices for {crop}</h3>
            <ul>
                {prices.map((price, index) => (
                    <li key={index}>
                        {price.market}: ${price.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MarketPrices;