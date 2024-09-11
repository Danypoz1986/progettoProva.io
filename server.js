const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Your Google Places API key (use environment variables for security)
const googlePlacesApiKey = 'AIzaSyDCnmMsKIcZRCcaQjWIOuh5Geh3CwWkYME'; // Replace with your actual key

app.get('/places', async (req, res) => {
    const city = req.query.city;
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
            params: {
                query: `top tourist attractions in ${city}`,
                key: googlePlacesApiKey
            }
        });
        res.json(response.data); // Send the response data back to the client
    } catch (error) {
        console.error('Error fetching sightseeing data:', error.message); // Log the error for debugging
        res.status(500).send('Error fetching sightseeing data');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
