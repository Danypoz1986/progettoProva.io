// WeatherInfo.js
import React from 'react';

const WeatherInfo = ({ data }) => {
  if (!data) {
    return null; // Do not render anything if there's no data
  }

  // Check if the data has the expected structure
  if (data.cod === 200) {
    return (
      <div id="weather-info">
        <h2>Weather in {data.name}</h2>
        <p>Temperature: {data.main.temp} °C</p>
        <p>Weather: {data.weather[0].description}</p>
      </div>
    );
  } else {
    return <p>Could not fetch weather data. Please try again.</p>;
  }
};

export default WeatherInfo;
