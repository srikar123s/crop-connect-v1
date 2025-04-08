import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import images from '../../Images';

const PlantDisease = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const diseaseInfoMap = {
    "Apple Scab Leaf": {
      treatment: "Prune infected leaves, rake fallen debris, and improve airflow.",
      pesticide: "Captan 50% WP – 1 kg in 500L water per 1 acres."
    },
    "Apple leaf": {
      treatment: "Monitor regularly and maintain tree hygiene.",
      pesticide: "Mancozeb 75% WP – 1.25 kg in 500L water per 1 acres."
    },
    "Apple rust leaf": {
      treatment: "Remove alternate host (juniper) nearby and prune infected leaves.",
      pesticide: "Myclobutanil 10% WP – 1L in 500L water per 1 acres."
    },
    "Bell_pepper leaf": {
      treatment: "Avoid overhead watering. Maintain proper spacing.",
      pesticide: "Azoxystrobin 23% SC – 0.6L in 500L water per 1 acres."
    },
    "Bell_pepper leaf spot": {
      treatment: "Remove infected plants and rotate crops regularly.",
      pesticide: "Copper Oxychloride 50% WP – 1.25 kg in 500L water per 1 acres."
    },
    "Blueberry leaf": {
      treatment: "Ensure good air circulation. Remove debris.",
      pesticide: "Chlorothalonil 75% WP – 1.5 kg in 500L water per 1 acres."
    },
    "Cherry leaf": {
      treatment: "Apply fungicide sprays during the growing season.",
      pesticide: "Captan 50% WP – 1 kg in 500L water per 1 acres."
    },
    "Corn Gray leaf spot": {
      treatment: "Use resistant hybrids and reduce irrigation stress.",
      pesticide: "Propiconazole 25% EC – 1L in 500L water per 1 acres."
    },
    "Corn leaf blight": {
      treatment: "Destroy infected debris. Use disease-resistant seeds.",
      pesticide: "Tebuconazole 25.9% EC – 1L in 500L water per 1 acres."
    },
    "Corn rust leaf": {
      treatment: "Monitor for rust early and apply protective sprays.",
      pesticide: "Azoxystrobin 23% SC – 0.6L in 500L water per 1 acres."
    },
    "Peach leaf": {
      treatment: "Rake fallen leaves. Apply fungicide during bud swell.",
      pesticide: "Chlorothalonil 75% WP – 1.5 kg in 500L water per 1 acres."
    },
    "Potato leaf": {
      treatment: "Monitor regularly. Avoid wet foliage.",
      pesticide: "Mancozeb 75% WP – 1.25 kg in 500L water per 1 acres."
    },
    "Potato leaf early blight": {
      treatment: "Remove infected plants. Use crop rotation.",
      pesticide: "Mancozeb 75% WP – 1.25 kg in 500L water per 1 acres."
    },
    "Potato leaf late blight": {
      treatment: "Avoid overhead irrigation. Spray during early stages.",
      pesticide: "Metalaxyl + Mancozeb – 1.5 kg in 500L water per 1 acres."
    },
    "Raspberry leaf": {
      treatment: "Cut back infected canes. Keep plant base clean.",
      pesticide: "Copper Hydroxide 77% WP – 1.25 kg in 500L water per 1 acres."
    },
    "Soyabean leaf": {
      treatment: "Plant certified seeds. Monitor early.",
      pesticide: "Carbendazim 50% WP – 1 kg in 500L water per 1 acres."
    },
    "Squash Powdery mildew leaf": {
      treatment: "Ensure air flow. Water roots, not leaves.",
      pesticide: "Sulfur Dust or Wettable Sulfur – 1.5 kg in 500L water per 1 acres."
    },
    "Strawberry leaf": {
      treatment: "Mulch to reduce splash. Avoid wetting foliage.",
      pesticide: "Captan 50% WP – 1 kg in 500L water per 1 acres."
    },
    "Tomato Early blight leaf": {
      treatment: "Remove affected leaves. Rotate crops annually.",
      pesticide: "Chlorothalonil 75% WP – 1.5 kg in 500L water per 1 acres."
    },
    "Tomato Septoria leaf spot": {
      treatment: "Remove infected foliage. Avoid overhead watering.",
      pesticide: "Copper Oxychloride 50% WP – 1.25 kg in 500L water per 1 acres."
    },
    "Tomato leaf": {
      treatment: "Watch for symptoms. Maintain proper spacing.",
      pesticide: "Neem oil (organic) – 30ml in 1L water; spray on leaves weekly."
    },
    "Tomato leaf bacterial spot": {
      treatment: "Use disease-free seeds. Remove infected leaves.",
      pesticide: "Streptocycline 0.01% – 20g in 500L water per 1 acres."
    },
    "Tomato leaf late blight": {
      treatment: "Plant resistant varieties. Avoid water logging.",
      pesticide: "Metalaxyl + Mancozeb – 1.5 kg in 500L water per 1 acres."
    },
    "Tomato leaf mosaic virus": {
      treatment: "Uproot infected plants. Avoid tobacco handling.",
      pesticide: "No direct pesticide; use neem oil to control vectors – 30ml/L."
    },
    "Tomato leaf yellow virus": {
      treatment: "Control whiteflies. Use yellow sticky traps.",
      pesticide: "Imidacloprid 17.8% SL – 1L in 500L water per 1 acres."
    },
    "Tomato mold leaf": {
      treatment: "Prune lower leaves. Avoid high humidity.",
      pesticide: "Chlorothalonil 75% WP – 1.5 kg in 500L water per 1 acres."
    },
    "Tomato two spotted spider mites leaf": {
      treatment: "Use insecticidal soap. Keep area dust-free.",
      pesticide: "Abamectin 1.8% EC – 300ml in 500L water per 1 acres."
    },
    "grape leaf": {
      treatment: "Prune excess leaves. Monitor for mildew.",
      pesticide: "Sulfur 80% WP – 1.25 kg in 500L water per 1 acres."
    },
    "grape leaf black rot": {
      treatment: "Remove infected berries. Ensure good airflow.",
      pesticide: "Myclobutanil 10% WP – 1L in 500L water per 1 acres."
    },

    "default": {
      treatment: "Keep plant surroundings clean and dry. Prune regularly.",
      pesticide: "Consult local agriculture officer for specific pesticide recommendation."
    }
  };


  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setPrediction(null);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image!");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const apiKey = "WT3N9c5fO8tP8Th0lnLS";
    const endpoint = `https://detect.roboflow.com/plant-disease-detection-3anip-b7zll/1?api_key=${apiKey}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* Header */}
      <header className="py-3 bg-light text-black">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/" className="navbar-brand">
              <img src={images['logo']} alt="Crop Connect Logo" width="50" /> <b>Crop Connect</b>
            </Link>
            <nav>
              <ul className="nav">
                <button className="btn nav-item" onClick={() => navigate('/')}>Home</button>
                <button className="btn nav-item" onClick={() => {
                  navigate('/#contact');
                  setTimeout(() => {
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}>Categories</button>
                <button className="btn nav-item" onClick={() => {
                  navigate('/#benefits');
                  setTimeout(() => {
                    document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}>Features</button>
                <button className="btn nav-item" onClick={() => {
                  navigate('/#contact');
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}>Contact Us</button>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "2rem", boxShadow: "0 0 10px rgba(0,0,0,0.1)", borderRadius: "12px", backgroundColor: "#fff" }}>
        <h2 className="text-center mb-4">🌿 Plant Disease Detector</h2>

        <input type="file" accept="image/*" onChange={handleImageChange} className="form-control mb-3" />

        {previewUrl && (
          <div className="mb-3 text-center">
            <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%", borderRadius: "10px" }} />
          </div>
        )}

        <div className="d-grid">
          <button onClick={handleUpload} disabled={loading} className="btn btn-success">
            {loading ? "Detecting..." : "Detect Disease"}
          </button>
        </div>

        {prediction && (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <h4>🧠 Prediction</h4>
            {prediction.predictions.length > 0 ? (
              (() => {
                const detectedClass = prediction.predictions[0].class;
                const info = diseaseInfoMap[detectedClass] || diseaseInfoMap["default"];

                return (
                  <div>
                    <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Disease: <span style={{ color: "#d9534f" }}>{detectedClass}</span>
                    </p>
                    <p><strong>Treatment:</strong> {info.treatment}</p>
                    <p><strong>Pesticide:</strong> {info.pesticide}</p>
                  </div>
                );
              })()
            ) : (
              <p>No disease detected.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantDisease;
