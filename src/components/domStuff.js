import format from 'date-fns/format';

/* eslint-disable import/prefer-default-export */
const currentTemp = document.querySelector('#current-temperature');
const currentWeatherIcon = document.querySelector('#current-weather-icon');
const currentLocation = document.querySelector('#current-location');
const currentDate = document.querySelector('#current-date');
const currentTime = document.querySelector('#current-time');
const currentConditionsFeelsLike = document.querySelector('#current-conditions-feels-like');
const currentConditionsHumidity = document.querySelector('#current-conditions-humidity');
const currentConditionsWindspeed = document.querySelector('#current-conditions-windspeed');
const currentConditionsText = document.querySelector('#current-conditions-heading');
const currentHighTemp = document.querySelector('#current-high-temp');
const currentLowTemp = document.querySelector('#current-low-temp');
const dailyForecastCards = document.querySelectorAll('.daily-forecast-card');

const setLocalDateAndTime = (date) => {
  const localDateAndTime = date.split(' ');
  const localDate = format(new Date(localDateAndTime[0]), 'PPPP');
  const localTime = localDateAndTime[1];
  currentDate.textContent = localDate;
  currentTime.textContent = localTime;
};

const setCurrentValues = (response) => {
  console.log(response);
  currentTemp.textContent = response.current.temp_f;
  currentWeatherIcon.src = response.current.condition.icon;
  currentLocation.textContent = `${response.location.name}, ${response.location.region}`;
  currentConditionsText.textContent = response.current.condition.text;
  currentConditionsFeelsLike.textContent = response.current.feelslike_f;
  currentConditionsHumidity.textContent = `${response.current.humidity}%`;
  currentConditionsWindspeed.textContent = `${response.current.wind_mph}`;
  currentHighTemp.textContent = `${response.forecast.forecastday[0].day.maxtemp_f}`;
  currentLowTemp.textContent = `${response.forecast.forecastday[0].day.mintemp_f}`;
  setLocalDateAndTime(response.location.localtime);
};

const setDailyCardStats = (card, day) => {
  const forecastDay = card.querySelector('#day');
  const forecastText = card.querySelector('#forecast-weather-text');
  const forecastIcon = card.querySelector('#forecast-weather-icon');
  const forecastHigh = card.querySelector('#forecast-high');
  const forecastLow = card.querySelector('#forecast-low');
  const forecastHumidity = card.querySelector('#forecast-humidity');
  const forcastWindSpeed = card.querySelector('#forecast-windspeed');
};

const setForecastValues = (response) => {
  for (let i = 0; i <= dailyForecastCards.length; i++) {
    for (let j = 0; j <= response.forecast.forecastday.length; j++) {
      if (j === i) {
        setDailyCardStats(dailyForecastCards[i], response.forecast.forecastday[i]);
      }
    }
  }
};
export { setCurrentValues, setForecastValues };
