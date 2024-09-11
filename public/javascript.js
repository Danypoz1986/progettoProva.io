// Your API keys
const apiKeyWeather = 'd34033ba69e9564878317e0a33950821'; // Replace with your OpenWeatherMap API Key
const apiKeyPlaces = 'AIzaSyDCnmMsKIcZRCcaQjWIOuh5Geh3CwWkYME'; // Replace with your Google Places API Key

function showElement(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = 'block'; // Show the element by changing the display style to 'block'
}

function capitalizeEachWord(string) {
    return string
        .split(' ') // Split the string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
        .join(' '); // Join the words back into a single string
}
async function fetchData() {
    let city = document.getElementById('city-input').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        // Fetch weather data
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}&units=metric`);
        const weatherData = await weatherResponse.json();
        displayWeather(weatherData);
        showElement('weather-info'); // Show weather information

        // Fetch sightseeing data
        const placesResponse = await fetch(`/places?city=${city}`);
        const placesData = await placesResponse.json();
        displaySightseeing(placesData, city); // Show sightseeing information
        showElement('sightseeing-info');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayWeather(data) {
    if (data.cod === 200) {
        document.getElementById('weather-info').innerHTML = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    } else {
        document.getElementById('weather-info').innerHTML = `<p>Could not fetch weather data. Please try again.</p>`;
    }
}

function displaySightseeing(data, city) {
    if (data.results && data.results.length > 0) {
        let sightseeingInfo = `<h2>Sightseeing in ${capitalizeEachWord(city)}</h2>`;
        data.results.forEach(place => {
            sightseeingInfo += `<p><strong>${place.name}</strong><br>${place.formatted_address}</p>`;
        });
        document.getElementById('sightseeing-info').innerHTML = sightseeingInfo;
    } else {
        document.getElementById('sightseeing-info').innerHTML = `<p>No sightseeing information available for ${city}.</p>`;
    }
}
