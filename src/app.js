/* eslint-disable import/named */
import './styles.css';
import './images/importImages';
import { setCurrentValues, setForecastValues } from './components/domStuff';
import { handleDegreeChange } from './components/degreeSlider';

const searchInput = document.querySelector('input');
const searchIcon = document.querySelector('.search-icon');
const degreeSlider = document.querySelector('.degree-slider');
const loadingAnimation = document.querySelector('.loaderWrapper');

searchInput.value = 'Boston';

async function getWeatherData() {
  try {
    const location = searchInput.value;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=0c8d02cc583a4b5f9ee214015233012&q=${location}&days=3&aqi=no&alerts=no`;
    loadingAnimation.classList.remove('hidden');
    const response = await fetch(url, { mode: 'cors' });
    const json = await response.json();
    loadingAnimation.classList.add('hidden');
    return json;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function handleSearchLocation() {
  try {
    const json = await getWeatherData();
    setCurrentValues(json);
    setForecastValues(json);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

handleSearchLocation();

searchIcon.addEventListener('click', handleSearchLocation);
degreeSlider.addEventListener('click', handleDegreeChange);

export default getWeatherData;
