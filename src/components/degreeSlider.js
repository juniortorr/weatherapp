/* eslint-disable no-plusplus */
import getWeatherData from '../app';

const switchDegreeText = async (degree) => {
  const forecastHighTempText = document.querySelectorAll('.high-temp-toggle');
  const forecastLowTempText = document.querySelectorAll('.low-temp-toggle');
  const currentHighTempText = document.querySelector('.current-high-temp-toggle');
  const currentLowTempText = document.querySelector('.current-low-temp-toggle');
  const currentTempText = document.querySelector('.current-temp-toggle');
  const currentFeelsLikeText = document.querySelector('#current-conditions-feels-like');
  const response = await getWeatherData();
  if (degree === 'fahrenheit') {
    currentTempText.textContent = response.current.temp_c;
    currentHighTempText.textContent = response.forecast.forecastday[0].day.maxtemp_c;
    currentLowTempText.textContent = response.forecast.forecastday[0].day.mintemp_c;
    currentFeelsLikeText.textContent = response.current.feelslike_c;
    for (let i = 0; i < forecastHighTempText.length; i++) {
      for (let j = 0; j < response.forecast.forecastday.length; j++) {
        if (i === j) {
          forecastHighTempText[i].textContent = response.forecast.forecastday[j].day.maxtemp_c;
        }
      }
    }
    for (let i = 0; i < forecastLowTempText.length; i++) {
      for (let j = 0; j < response.forecast.forecastday.length; j++) {
        if (i === j) {
          forecastLowTempText[i].textContent = response.forecast.forecastday[j].day.mintemp_c;
        }
      }
    }
  } else {
    currentTempText.textContent = response.current.temp_f;
    currentHighTempText.textContent = response.forecast.forecastday[0].day.maxtemp_f;
    currentLowTempText.textContent = response.forecast.forecastday[0].day.mintemp_f;
    currentFeelsLikeText.textContent = response.current.feelslike_f;
    for (let i = 0; i < forecastHighTempText.length; i++) {
      for (let j = 0; j < response.forecast.forecastday.length; j++) {
        if (i === j) {
          forecastHighTempText[i].textContent = response.forecast.forecastday[j].day.maxtemp_f;
        }
      }
    }
    for (let i = 0; i < forecastLowTempText.length; i++) {
      for (let j = 0; j < response.forecast.forecastday.length; j++) {
        if (i === j) {
          forecastLowTempText[i].textContent = response.forecast.forecastday[j].day.mintemp_f;
        }
      }
    }
  }
};

const switchDegreeSymbol = (degree, slider) => {
  const degreeLabels = document.querySelectorAll('span');
  if (degree === 'fahrenheit') {
    slider.classList.add('celsius');
    slider.setAttribute('degree', 'celcius');
    console.log(slider.getAttribute('degree'));
    degreeLabels.forEach((label) => {
      const degreeSymbol = label;
      degreeSymbol.innerHTML = '&#8451;';
    });
  } else {
    slider.classList.remove('celsius');
    slider.setAttribute('degree', 'fahrenheit');
    degreeLabels.forEach((label) => {
      const degreeSymbol = label;
      degreeSymbol.innerHTML = '&#8457;';
    });
  }
};

function handleDegreeChange() {
  const slider = document.querySelector('.slider');
  const degree = slider.getAttribute('degree');
  switchDegreeText(degree);
  switchDegreeSymbol(degree, slider);
}

export { handleDegreeChange, switchDegreeSymbol };
