import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './weather.css';
import images from '../../Images'

const WeatherForecast = () => {
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState("Mumbai");
  const apiKey = "79623b87751c4cf1a6b51918241111"; // Replace with your WeatherAPI key
  const navigate = useNavigate();


  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
        );
        const data = await response.json();
        if (response.ok) {
          setForecast(data.forecast.forecastday);
        } else {
          console.log("Error:", data.error.message);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeather();
  }, [city, apiKey]);

  // Format date as DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
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
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
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

      <div className="weather-forecast">
        <h2>3-Day Weather Forecast for {city}</h2>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {forecast ? (
          <div className="forecast-container">
            {forecast.map((day) => (
              <div key={day.date} className="forecast-day">
                <h3>{formatDate(day.date)}</h3>
                <p>Max Temp: {day.day.maxtemp_c}°C</p>
                <p>Min Temp: {day.day.mintemp_c}°C</p>
                <p>Condition: {day.day.condition.text}</p>
                <img src={`https:${day.day.condition.icon}`} alt={day.day.condition.text} />
              </div>
            ))}
          </div>
        ) : (
          <p>Loading forecast...</p>
        )}
      </div>
    </>
  );
};

export default WeatherForecast;
