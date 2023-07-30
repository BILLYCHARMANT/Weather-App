const apiKey = '994af7657be84bcb983180756232907';
const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');
const weatherDataDiv = document.getElementById('weatherData');
const loadingDiv = document.getElementById('loading');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = locationInput.value.trim();
  if (location !== '') {
    getWeatherData(location);
  }
});

async function getWeatherData(location) {
  showLoading();
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q={location}&appid={apiKey}`);
    const data = await response.json();
    const weatherData = processWeatherData(data);
    displayWeatherData(weatherData);
    hideLoading();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    hideLoading();
  }
}

function processWeatherData(data) {
  const { name, main, weather } = data;
  const temperature = main.temp;
  const description = weather[0].description;
  return { name, temperature, description };
}

function displayWeatherData(weatherData) {
  weatherDataDiv.innerHTML = `
    <p><strong>Location:</strong> ${weatherData.name}</p>
    <p><strong>Temperature:</strong> ${weatherData.temperature}°C</p>
    <p><strong>Description:</strong> ${weatherData.description}</p>
  `;
  weatherInfo.classList.remove('hidden');
}

function showLoading() {
  loadingDiv.classList.remove('hidden');
}

function hideLoading() {
  loadingDiv.classList.add('hidden');
}

