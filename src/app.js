import './styles.css';
import './images/importImages';

const url =
  'http://api.weatherapi.com/v1/forecast.json?key=0c8d02cc583a4b5f9ee214015233012&q=London&days=3&aqi=no&alerts=no';

async function handleSearchLocation() {
  // grap input data
  const response = await fetch(url, { mode: 'cors' });
  const json = await response.json();
  console.log(json);
}
handleSearchLocation();
