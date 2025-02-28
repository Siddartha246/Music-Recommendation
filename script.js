function getWeather() {
    const location = document.getElementById('location').value;
    const apiKey = 'ad45d2f127044ae138887a1c096a5fe6'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data); // Check what the API returns
        if (data.cod === 200 && data.main && data.weather) {
            displayWeather(data);
        } else {
            displayError(`Weather data not available. Error: ${data.message}`);
        }
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        displayError('Error fetching weather data. Please try again later.');
    });

}

function displayWeather(data) {
    const weatherWidget = document.getElementById('weather-widget');
    weatherWidget.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayError(message) {
    const weatherWidget = document.getElementById('weather-widget');
    weatherWidget.innerHTML = `<p>${message}</p>`;
}
