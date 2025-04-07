import React, { useState } from 'react';
import axios from 'axios';

const PlantDisease = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult('');
    }
  };

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post(
        'http://localhost:3000/api/detect/detect-disease',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setResult(res.data.prediction || 'No result returned');
    } catch (error) {
      setResult('Error detecting disease');
      console.error('Detection error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-4">
      <h2 className="text-xl font-semibold mb-4">🌿 Plant Disease Detection</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      
      {preview && <img src={preview} alt="preview" className="mt-4 w-60 h-auto rounded-lg shadow" />}
      
      <button
  className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
  onClick={handleSubmit}
>
  Detect Disease
</button>


      {result && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded shadow">
          <strong>Prediction:</strong> {result}
        </div>
      )}
    </div>
  );
};

export default PlantDisease;
