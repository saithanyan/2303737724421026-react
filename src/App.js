import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    const API_KEY = '82f62c2b72760dba1972d855243b050c'; // Replace with your OpenWeatherMap API key
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const handleSearch = () => {
    if (query.trim()) fetchWeather();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h1 className="text-center">Weather App</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
        {error && <p className="text-danger text-center">{error}</p>}
        {weather && (
          <div className="card bg-light mt-3 p-3">
            <h2 className="text-center">{weather.name}, {weather.sys.country}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;