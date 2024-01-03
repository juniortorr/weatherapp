/* eslint-disable import/named */
import './styles.css';
import './images/importImages';
import { setCurrentValues, setForecastValues } from './components/domStuff';

const searchInput = document.querySelector('input');
const searchIcon = document.querySelector('.search-icon');

searchInput.value = 'Boston';

async function handleSearchLocation() {
  try {
    const location = searchInput.value;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=0c8d02cc583a4b5f9ee214015233012&q=${location}&days=3&aqi=no&alerts=no`;
    const response = await fetch(url, { mode: 'cors' });
    const json = await response.json();
    setCurrentValues(json);
    setForecastValues(json);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

handleSearchLocation();

searchIcon.addEventListener('click', handleSearchLocation);
