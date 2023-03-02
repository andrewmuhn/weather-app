const apiKey = '64a57b8b595143bde642b3a647236223';
let requestUrl = 'http://api.openweathermap.org/'

//elements from dom
let searchFormEl = document.querySelector('#search-form');

//!psuedo code
//take input city from user entry and convert it into the applicable parameters to append to the request urls for both current and 5 day forecast
// - save city and attached urls to local storage
// - append button of city to search list so user can click on previously searched cities.
//extract needed information (temp, wind, humidity) from returned JSON object.
// - append above info into html document
//


//TODO: create fetch request that accepts a URL varaible
let fetchFunc = (requestUrl) => {
  fetch(requestUrl)
    .then((response) => {
      if (!response.ok) {
        throw response.json()
      }

      return response.json();
    })
    .then((data) => {
      console.log('Fetch Response \n----------------');
      console.log(data);
      if (data[0].local_names) {
        console.log(data[0].local_names);
        searchCityWeather(data[0].lat, data[0].lon);
        saveToLocalStorage(data[0].lat, data[0].lon);
      }

    })
    .catch((error) => {
      console.error(error);
    });
}


//should take user inputs and extract applicable parmeters and fire off functions to fetch geocode from city name.
const handleFormSubmit = (event) => {
  event.preventDefault();
  let cityName = document.querySelector('#city-name').value.trim();
  cityName = cityName.toLowerCase().replace(' ', '-');
  console.log(cityName);
  requestUrl = requestUrl.concat('geo/1.0/direct?limit=1&appid=' + apiKey + '&q=' + cityName);
  fetchFunc(requestUrl);
}

//takes geocode info and fires of fetch request for current weather and 5-day weather. fires off saveToLocalStorage
const searchCityWeather = (lat, lon) => {
  console.log(lat);
  console.log(lon);
}

//extracts values from retured JSON weather data and displays them in html file
const printWeatherData = () => {

}

//save an an array of objects to local storage with user input as key and fetched geocode as value. fires off readromLocalStorage
const saveToLocalStorage = () => {

}

//parses data from local storage. if no dat hen reurn an empty array.firest off printCityList
const readFromLocalStorage = () => {

}

//take parsed data from local storage and save it in the form of a button that is appended to the search list
const printCityList = () => {

}

//TODO: create event handlers for:
// -search button to fire off handleFormSubmit
searchFormEl.addEventListener('submit', handleFormSubmit);
// -appended city buttons to fire off fetchCityWeather

//call functions
