import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Seeds from './components/Seeds/Seeds';
import Fer from './components/Fertilizers/Fer';
import Tools from './components/Tools/Tools';
import Check from './components/Checkout/Check';
import NoPage from './components/NoPage/NoPage';
import WeatherForecast from './components/Weather/Weather';
import ProductDetail from './components/detais/ProductDetail';

function App() {
  const [seeds, setSeeds] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products/'); // Replace with your API endpoint
                const data = await response.json();
                setSeeds(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (product) => {
      

        console.log("Adding product to cart:", product);
    };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="seeds" element={<Seeds />} />
          <Route path="fer" element={<Fer />} />
          <Route path="tools" element={<Tools />} />
          <Route path="check" element={<Check />} />          
          <Route path="weather" element={<WeatherForecast />} />
          
          <Route path="/product/:id" element={<ProductDetail seeds={seeds} addToCart={addToCart} />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
