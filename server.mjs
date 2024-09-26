import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(process.cwd(), 'build')));

// Middleware to log incoming requests and their headers
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'build', 'index.html')); // Serve the main HTML file for React
});

// Route to fetch weather data
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

// Route to fetch sightseeing data
app.get('/api/places', async (req, res) => {
  const { city } = req.query;
  const apiKey = 'AIzaSyDCnmMsKIcZRCcaQjWIOuh5Geh3CwWkYME'; // Your Google Places API Key
  try {
    const placesResponse = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=sightseeing+in+${city}&key=${apiKey}`);
    const placesData = await placesResponse.json();

    if (placesResponse.ok) {
      res.json(placesData);
    } else {
      res.status(placesResponse.status).json(placesData);
    }
  } catch (error) {
    console.error('Error fetching places data:', error);
    res.status(500).send('Error fetching places data');
  }
});

// Catch-all handler for any request that doesn't match a route
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
