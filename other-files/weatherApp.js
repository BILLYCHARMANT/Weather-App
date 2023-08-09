// const apiKey = "8d171f1cb04441a2b5b204211233107"

const weatherForm = document.getElementById('weatherForm');
const locationInput = document.querySelector('#locationInput');
const weatherInfo = document.getElementById('weatherInfo');
const weatherDataDiv = document.getElementById('weatherData');
const loadingDiv = document.getElementById('loading');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = locationInput.value;
  if (location !== '') {
    getWeatherData(location);
  }
});
async function getWeatherData(location) {
  // typeOfQuery(location);
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?q=${location}&key=622d5f7b068843d18fd100432230908`,
      { mode: 'cors' }
    );
    const data = await response.json();
    displayWeatherData(data);
    console.log(data);
  } catch (err) {
    alert(err);
  }
}


// async function getWeatherData(location) {
//   showLoading();
//   try {
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8d171f1cb04441a2b5b204211233107`);
//     console.log(response)
//     const data = await response.json();
//     const weatherData = processWeatherData(data);
//     displayWeatherData(weatherData);
//     hideLoading();
//   } catch (error) {
//     console.error('Error fetching weather data:', error);
//     hideLoading();
//   }
// }

function processWeatherData(data) {
  console.log(data)
  const { name, main, weather } = data;
  const temperature = main.temp;
  const description = weather[0].description;
  return { name, temperature, description };
}

function displayWeatherData(weatherData) {
  console.log(weatherData)
  weatherDataDiv.innerHTML = `
    <p><strong>Location:</strong> ${weatherData.location.name}</p>
    <p><strong>Temperature:</strong> ${weatherData.current.temp_c}°C</p>
    <p><strong>Description:</strong> ${weatherData.current.condition.text}</p>
  `;
  weatherInfo.classList.remove('hidden');
}

function showLoading() {
  loadingDiv.classList.remove('hidden');
}

function hideLoading() {
  loadingDiv.classList.add('hidden');
}


