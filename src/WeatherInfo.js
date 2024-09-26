// WeatherInfo.js
import React from 'react';

function WeatherInfo({ weatherData }) {
  if (!weatherData) {
    return null; // Do not render anything if there's no weather data yet
  }

  if (!weatherData.main) {
    return <p>No weather data available.</p>; // Show this message only if weather data is fetched but incomplete
  }

  return (
    <div>
      <h2>Weather in {weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp} °C</p>
      <p>Weather: {weatherData.weather[0].description}</p>
    </div>
  );
}

export default WeatherInfo;
