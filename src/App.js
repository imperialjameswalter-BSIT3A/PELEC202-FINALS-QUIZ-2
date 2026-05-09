import React, { useState } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = "816b91ca7679965494beac6e4816c5e5"; 

  const fetchWeather = async () => {
    if (city.trim() === '') {
      setError('Please enter a city name');
      setWeather(null);
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather({
        name: data.name,
        temp: data.main.temp,
        condition: data.weather[0].description,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>🌤 Weather Finder</h1>
      <input
        type="text"
        value={city}
        placeholder="Enter city name..."
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '10px', width: '250px', marginRight: '10px' }}
      />
      <button onClick={fetchWeather} style={{ padding: '10px 15px' }}>
        Get Weather
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div style={{ marginTop: '20px' }}>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.temp} °C</p>
          <p>Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
};

export default App;
