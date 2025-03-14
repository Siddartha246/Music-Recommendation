// Weather Widget - Fetch and Display Weather
function getWeather() {
    const location = document.getElementById('location').value;
    const apiKey = 'ad45d2f127044ae138887a1c096a5fe6'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.main && data.weather) {
                displayWeather(data);
                recommendMusic(data.weather[0].description.toLowerCase());
            } else {
                displayError('Weather data not available. Please check the location.');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayError('Error fetching weather data. Try again later.');
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

// Music Recommendations - Library and Player
const musicLibrary = {
    sunny: [
        { title: "Walking on Sunshine", artist: "Katrina and the Waves", url: "song1.mp3" },
        { title: "Good as Hell", artist: "Lizzo", url: "song2.mp3" },
        { title: "Electric Feel", artist: "MGMT", url: "song3.mp3" },
        { title: "Island in the Sun", artist: "Weezer", url: "song4.mp3" },
        { title: "Summer of '69", artist: "Bryan Adams", url: "song5.mp3" }
    ],
    rainy: [
        { title: "Banana Pancakes", artist: "Jack Johnson", url: "song6.mp3" },
        { title: "The Rain", artist: "The Script", url: "song7.mp3" },
        { title: "I Can’t Stand the Rain", artist: "Ann Peebles", url: "song8.mp3" },
        { title: "Why Does It Always Rain on Me?", artist: "Travis", url: "song9.mp3" },
        { title: "Rainy Days and Mondays", artist: "The Carpenters", url: "song10.mp3" }
    ],
    cloudy: [
        { title: "The Sound of Silence", artist: "Simon & Garfunkel", url: "song11.mp3" },
        { title: "Shine On You Crazy Diamond part-1", artist: "Pink Floyd", url: "song12.mp3" },
        { title: "Shine On You Crazy Diamond part-2", artist: "Pink Floyd", url: "song13.mp3" },
        { title: "Shine On You Crazy Diamond part-3", artist: "Pink Floyd", url: "song14.mp3" },
    ]
};

function recommendMusic(weatherCondition) {
    let recommendedSongs = [];
    if (weatherCondition.includes('sunny')) {
        recommendedSongs = musicLibrary.sunny;
    } else if (weatherCondition.includes('rain')) {
        recommendedSongs = musicLibrary.rainy;
    } else if (weatherCondition.includes('cloud')) {
        recommendedSongs = musicLibrary.cloudy;
    } else {
        recommendedSongs = [{ title: "Nature Sounds", artist: "Ambient", url: "song1.mp3" }];
    }
    displayRecommendations(recommendedSongs);
}

function displayRecommendations(songs) {
    const musicRecommendations = document.getElementById('music-recommendations');
    musicRecommendations.innerHTML = ''; // Clear previous content

    songs.forEach(song => {
        const songElement = document.createElement('div');
        songElement.innerHTML = `
            <p>${song.title} - ${song.artist}</p>
            <audio controls>
                <source src="${song.url}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;
        musicRecommendations.appendChild(songElement);
    });
}
