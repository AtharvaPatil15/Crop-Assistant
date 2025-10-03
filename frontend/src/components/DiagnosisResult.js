import React from 'react';

const DiagnosisResult = ({ result }) => {
    if (!result) {
        return <div>No diagnosis result available.</div>;
    }

    const { diseaseName, confidence, treatmentSteps } = result;

    return (
        <div>
            <h2>Diagnosis Result</h2>
            <p><strong>Disease Name:</strong> {diseaseName}</p>
            <p><strong>Confidence Level:</strong> {confidence}%</p>
            <h3>Treatment Steps:</h3>
            <ul>
                {treatmentSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ul>
        </div>
    );
};

export default DiagnosisResult;