import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            onImageUpload(file);
        }
    };

    return (
        <div>
            <h2>Upload Crop Image</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {selectedImage && <img src={selectedImage} alt="Crop Preview" style={{ width: '300px', marginTop: '10px' }} />}
        </div>
    );
};

export default ImageUpload;