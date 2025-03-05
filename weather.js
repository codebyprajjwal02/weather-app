const apiKey = 'ee034059f3f947b68afcb42f5c247806'; // Get your API key from https://openweathermap.org/api
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

// Function to fetch weather data from the API
const getWeather = async () => {
    const city = cityInput.value;
    if (city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.cod === '404') {
                weatherInfo.innerHTML = `<p>City not found. Please try again.</p>`;
            } else {
                const { name, weather, main, wind } = data;
                const temperature = main.temp;
                const description = weather[0].description;
                const humidity = main.humidity;
                const windSpeed = wind.speed;

                weatherInfo.innerHTML = `
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                `;
            }
        } catch (error) {
            weatherInfo.innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
        }
    } else {
        weatherInfo.innerHTML = `<p>Please enter a city name.</p>`;
    }
};

// Event listener for the button
getWeatherBtn.addEventListener('click', getWeather);
