import React, { useState } from 'react';
import './App.css';
import WeatherInfo from './WeatherInfo.js';
import SightseeingInfo from './SightseeingInfo.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [sightseeingData, setSightseeingData] = useState(null);
  const [error, setError] = useState(null); // Added error state

  const fetchData = async () => {
    console.log('Fetch data function called'); // Check if function is triggered
    const city = document.getElementById('city-input').value;
    if (!city) {
      alert('Please enter a city name');
      return;
    }
  
    try {
      console.log('Fetching weather data...'); // Log before fetching weather data
      const weatherResponse = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      console.log('Weather Response:', weatherResponse); // Log the response object
      if (!weatherResponse.ok) {
        throw new Error('Weather data not available');
      }
      const weather = await weatherResponse.json();
      console.log('Weather Data:', weather); // Log the weather data
      setWeatherData(weather);
      setError(null); // Clear any previous errors
  
      console.log('Fetching sightseeing data...'); // Log before fetching sightseeing data
      const placesResponse = await fetch(`/api/places?city=${encodeURIComponent(city)}`);
      console.log('Places Response:', placesResponse); // Log the response object
      if (!placesResponse.ok) {
        throw new Error('Sightseeing data not available');
      }
      const places = await placesResponse.json();
      console.log('Sightseeing Data:', places); // Log the sightseeing data
      setSightseeingData(places);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message); // Store the error message to display it
    }
  };
  
  return (
    <div className="container mt-5">
      <h1 className="mb-4">City Weather and Sightseeing</h1>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          id="city-input"
          placeholder="Enter a city name"
          aria-label="City"
        />
        <button
          className="btn btn-primary"
          onClick={fetchData}
        >
          Get Info
        </button>
      </div>

      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Render the WeatherInfo component */}
      <WeatherInfo data={weatherData} />

      {/* Render the SightseeingInfo component */}
      {weatherData && (
        <SightseeingInfo data={sightseeingData} city={weatherData.name} />
      )}
    </div>
  );
}

export default App;
