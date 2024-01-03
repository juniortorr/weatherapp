/* eslint-disable no-plusplus */
import format from 'date-fns/format';

// fahrenheit = &#8457; celsius = <span>&#8451;</span>

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
const currentConditionsWindDirection = document.querySelector('#current-conditions-wind-direction');
const currentHighTemp = document.querySelector('#current-high-temp');
const currentLowTemp = document.querySelector('#current-low-temp');
const dailyForecastCards = document.querySelectorAll('.daily-forecast-card');

const setLocalDateAndTime = (date) => {
  const localDateAndTime = date.split(' ');
  let localDateFormatted = localDateAndTime[0].split('-');
  localDateFormatted = [localDateFormatted[1], localDateFormatted[2], localDateFormatted[0]].join(
    '-'
  );
  console.log(localDateFormatted);
  const localDate = format(new Date(localDateFormatted), 'PPPP');
  const localTime = localDateAndTime[1];
  currentDate.textContent = localDate;
  currentTime.textContent = localTime;
};

const getFormattedForecastDate = (day) => {
  const formatDay = day.split('-');
  const formattedDay = [formatDay[1], formatDay[2], formatDay[0]];
  return format(new Date(formattedDay), 'eeee');
};

const setCurrentValues = (response) => {
  console.log(response);
  // eslint-disable-next-line prefer-template
  currentTemp.textContent = response.current.temp_f;
  currentWeatherIcon.src = response.current.condition.icon;
  currentLocation.textContent = `${response.location.name}, ${response.location.region}`;
  currentConditionsText.textContent = response.current.condition.text;
  currentConditionsFeelsLike.textContent = response.current.feelslike_f;
  currentConditionsHumidity.textContent = `${response.current.humidity}%`;
  currentConditionsWindspeed.textContent = `${response.current.wind_mph}`;
  currentConditionsWindDirection.textContent = response.current.wind_dir;
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
  const forecastWindSpeed = card.querySelector('#forecast-windspeed');
  const forecastChanceOfRain = card.querySelector('#forecast-chance-of-rain');
  forecastDay.textContent = getFormattedForecastDate(day.date);
  forecastText.textContent = day.day.condition.text;
  forecastIcon.src = day.day.condition.icon;
  forecastHigh.textContent = `H: ${day.day.maxtemp_f}`;
  forecastLow.textContent = `L: ${day.day.mintemp_f}`;
  forecastHumidity.textContent = `${day.day.avghumidity}%`;
  forecastWindSpeed.textContent = day.day.maxwind_mph;
  forecastChanceOfRain.textContent = `${day.day.daily_chance_of_rain}%`;
};

const setForecastValues = (response) => {
  for (let i = 0; i < dailyForecastCards.length; i++) {
    for (let j = 0; j < response.forecast.forecastday.length; j++) {
      if (j === i) {
        setDailyCardStats(dailyForecastCards[i], response.forecast.forecastday[i]);
      }
    }
  }
};
export { setCurrentValues, setForecastValues };
