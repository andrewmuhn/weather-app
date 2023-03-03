const apiKey = '64a57b8b595143bde642b3a647236223';
let cityList;

//elements from dom
let searchFormEl = document.querySelector('#search-form');
let cityListEl = document.querySelector('#city-list');
let currentWeatherEl = document.querySelector('#current-weather');
let forecastContainerEl = document.querySelector('#forecast-container');
let errorModal = new bootstrap.Modal('#error-modal')

//!psuedo code
//take input city from user entry and convert it into the applicable parameters to append to the request urls for both current and 5 day forecast
// - save city and attached urls to local storage
// - append button of city to search list so user can click on previously searched cities.
//extract needed information (temp, wind, humidity) from returned JSON object.
// - append above info into html document

//* fetch request

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

      if (data.length === 0) {
        errorModal.show();
      }

      //checks if response was a geocode, current weather, or 5 day forecast request
      if (data.hasOwnProperty('local_names')) {
        searchCityWeather(data[0].lat, data[0].lon);
        saveToLocalStorage(data[0].name, data[0].lat, data[0].lon);
      } else if (data.hasOwnProperty('main')) {
        printCurrentWeatherData(data);
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
  let requestUrl = 'http://api.openweathermap.org/'
  event.preventDefault();
  let cityName = document.querySelector('#city-name').value.trim();
  cityName = cityName.toLowerCase().replace(' ', '-');
  requestUrl = requestUrl.concat(`geo/1.0/direct?limit=1&q=${cityName}&appid=${apiKey}`);
  searchApi(requestUrl);
}

//takes geocode info and fires of fetch request for current weather and 5-day weather. fires off saveToLocalStorage
const searchCityWeather = (lat, lon) => {
  let requestUrl = 'http://api.openweathermap.org/'
  let currentURL = requestUrl.concat(`data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${apiKey}`);
  requestUrl = 'http://api.openweathermap.org/'
  let forecastUrl = requestUrl.concat(`data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${apiKey}`);

  searchApi(currentURL);
  searchApi(forecastUrl);
}

//extracts values from retured JSON weather data and displays them in html file
const printCurrentWeatherData = (data) => {
  // console.log('test: current');
  // console.log(data);
}


//receives data from server and displays it
const print5DayWeatherData = (data) => {

  let forecastArr = [data.slice(3, 4), data.slice(11, 12), data.slice(19, 20), data.slice(27, 28), data.slice(35, 36)];
  console.log(forecastArr);
  forecastContainerEl.innerHTML = '';
  for (let i = 0; i < forecastArr.length; i++) {
    let date = forecastArr[i][0].dt_txt;
    let icon = forecastArr[i][0].weather[0].icon;
    let temp = forecastArr[i][0].main.temp;
    let wind = forecastArr[i][0].wind.speed;
    let humidity = forecastArr[i][0].main.humidity;

    date = date.replaceAll('-', '/').split(' ');

    let dateEl = document.createElement('h4');
    dateEl.textContent = date[0];

    let iconEl = document.createElement('img');
    iconEl.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);

    let forecastEl = document.createElement('div');
    forecastEl.setAttribute('class', 'col bg-info border rounded-3');
    let tempEl = document.createElement('p');
    tempEl.innerHTML = `Temp: ${temp}&#8457;`;
    let windEl = document.createElement('p');
    windEl.textContent = `Wind: ${wind}MPH`;
    let humidityEl = document.createElement('p');
    humidityEl.textContent = `Humidity: ${humidity}%`;

    forecastEl.append(dateEl);
    forecastEl.append(iconEl);
    forecastEl.append(tempEl);
    forecastEl.append(windEl);
    forecastEl.append(humidityEl);
    forecastContainerEl.append(forecastEl);
  }

}

// parses data from local storage for other functions to use
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

//handles getting localstorage info for the saved city and fires off the fetch request for current and 5 day weather
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

///simple function that runs when close button on modal is click and closes the error modal
const closeModal = () => {
  errorModal.hide();
}


// * Event Handlers
// -search button to fire off handleFormSubmit
searchFormEl.addEventListener('submit', handleFormSubmit);
// -appended city buttons to fire off fetchCityWeather
cityListEl.addEventListener('click', handleCityRecall);
// -listens for clicks on the close button in the modal
document.querySelector('.close').addEventListener('click', closeModal);

// * init function
//runs the city list function on start up to see if there are already previously view cities in local storage
printCityList();