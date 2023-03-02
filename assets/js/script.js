const apiKey = '64a57b8b595143bde642b3a647236223';
let requestUrl = 'http://api.openweathermap.org/'
let cityList;

//elements from dom
let searchFormEl = document.querySelector('#search-form');
let cityListEl = document.querySelector('#city-list');

//!psuedo code
//take input city from user entry and convert it into the applicable parameters to append to the request urls for both current and 5 day forecast
// - save city and attached urls to local storage
// - append button of city to search list so user can click on previously searched cities.
//extract needed information (temp, wind, humidity) from returned JSON object.
// - append above info into html document
//


//TODO: create fetch request that accepts a URL varaible
let searchApi = (requestUrl) => {
  console.log(requestUrl);
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
      console.log(data.hasOwnProperty('local_names'));
      console.log(data.hasOwnProperty('main'));
      console.log(data.hasOwnProperty('list'));

      //checks if it was a geocode request
      if (data.hasOwnProperty('local_names')) {
        searchCityWeather(data[0].lat, data[0].lon);
        saveToLocalStorage(data[0].name, data[0].lat, data[0].lon);
      } else if (data.hasOwnProperty('main')) {
        printCurrentWeatherData(data.main);
      } else if (data.hasOwnProperty('list')) {
        print5DayWeatherData(data.list);
      }
    })

    .catch((error) => {
      console.error(error);
    });
}


//should take user inputs and extract applicable parmeters and fire off functions to fetch geocode from city name.
const handleFormSubmit = (event) => {
  requestUrl = 'http://api.openweathermap.org/'
  event.preventDefault();
  let cityName = document.querySelector('#city-name').value.trim();
  cityName = cityName.toLowerCase().replace(' ', '-');
  console.log(cityName);
  requestUrl = requestUrl.concat(`geo/1.0/direct?limit=1&q=${cityName}&appid=${apiKey}`);
  searchApi(requestUrl);
}

//takes geocode info and fires of fetch request for current weather and 5-day weather. fires off saveToLocalStorage
const searchCityWeather = (lat, lon) => {
  requestUrl = 'http://api.openweathermap.org/'
  console.log(lat);
  console.log(lon);
  let currentURL = requestUrl.concat(`data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
  requestUrl = 'http://api.openweathermap.org/'
  let forecastUrl = requestUrl.concat(`data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);

  searchApi(currentURL);
  searchApi(forecastUrl);
}

//extracts values from retured JSON weather data and displays them in html file
const printCurrentWeatherData = (data) => {
  console.log('test: current');
  console.log(data);
}

const print5DayWeatherData = (data) => {
  console.log('test: 5day');
  console.log(data[3]);
  console.log(data[11]);
  console.log(data[19]);
  console.log(data[27]);
  console.log(data[35]);

}

const readLocalStorage = () => {

  cityList = localStorage.getItem('cityList');
  if (cityList) {
    cityList = JSON.parse(cityList);
  } else {
    cityList = [];
  }

}

//save an an array of objects to local storage with city name lat and long as values. fires off printCityList
const saveToLocalStorage = (cityName, lat, lon) => {

  readLocalStorage();

  console.log(cityList);
  console.log(lat);
  console.log(lon);
  console.log(cityName);

  let newCity = {
    cityName: cityName,
    lat: lat,
    lon: lon
  };

  cityList.splice(0, 0, newCity);
  localStorage.setItem('cityList', JSON.stringify(cityList));
  printCityList();
}

//take parsed data from local storage and save it in the form of a button that is appended to the search list
const printCityList = () => {
  //clears cityListEl to not have repeating list
  cityListEl.innerHTML = '';

  let cityList = localStorage.getItem('cityList');
  cityList = JSON.parse(cityList);
  console.log(cityList);
  for (let i = 0; i < cityList.length; i++) {
    const name = cityList[i].cityName;


    let newListItem = document.createElement('div');
    newListItem.setAttribute('class', 'd-grid my-2');

    let newButton = document.createElement('button');
    newButton.setAttribute('type', 'button');
    newButton.setAttribute('class', 'btn bg-dark-subtle');
    newButton.textContent = name;

    newListItem.append(newButton);
    cityListEl.append(newListItem);
  }
  console.log(searchFormEl);
}

const handleCityRecall = (event) => {
  event.stopPropagation();

  readLocalStorage();
  let lat = '';
  let lon = '';

  let cityName = event.target.textContent;
  for (let i = 0; i < cityList.length; i++) {
    if (cityList[i].cityName === cityName) {
      lat = cityList[i].lat;
      lon = cityList[i].lon;
    }
  }

  searchCityWeather(lat, lon);
}

//TODO: create event handlers for:
// -search button to fire off handleFormSubmit
searchFormEl.addEventListener('submit', handleFormSubmit);
// -appended city buttons to fire off fetchCityWeather
cityListEl.addEventListener('click', handleCityRecall)

//call functions
printCityList();