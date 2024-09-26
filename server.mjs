import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Add this route to handle the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Weather and Sightseeing API!'); // You can customize this message
});

// Existing route to fetch weather data
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;
  const apiKey = 'd34033ba69e9564878317e0a33950821'; // Your OpenWeatherMap API Key
  try {
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const weatherData = await weatherResponse.json();

    if (weatherResponse.ok) {
      res.json(weatherData);
    } else {
      res.status(weatherResponse.status).json(weatherData);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).send('Error fetching weather data');
  }
});

// You may want to include your sightseeing data route here as well

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
