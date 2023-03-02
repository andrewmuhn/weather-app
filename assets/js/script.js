const apiKey = '64a57b8b595143bde642b3a647236223';
let requestUrl = 'http://api.openweathermap.org/'

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

      //checks if it was a geocode request
      if (data[0].local_names) {
        console.log(data[0].local_names);
        searchCityWeather(data[0].lat, data[0].lon);
        saveToLocalStorage(data[0].name, data[0].lat, data[0].lon);
      }

      //

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
  searchApi(requestUrl);
}

//takes geocode info and fires of fetch request for current weather and 5-day weather. fires off saveToLocalStorage
const searchCityWeather = (lat, lon) => {
  // console.log(lat);
  // console.log(lon);
}

//extracts values from retured JSON weather data and displays them in html file
const printWeatherData = () => {

}

//parses data from local storage. if no data then reurn an empty array.firest off printCityList
// const readFromLocalStorage = () => {
//   let cityList = localStorage.getItem('cityList')
//   if (cityList) {
//     cityList = JSON.parse(cityList);
//   } else {
//     cityList = [];
//   }
//   return cityList;

// }

//save an an array of objects to local storage with user input as key and fetched geocode as value. fires off readromLocalStorage
const saveToLocalStorage = (cityName, lat, lon) => {

  let cityList = localStorage.getItem('cityList');
  if (cityList) {
    cityList = JSON.parse(cityList);
  } else {
    cityList = [];
  }


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

//TODO: create event handlers for:
// -search button to fire off handleFormSubmit
searchFormEl.addEventListener('submit', handleFormSubmit);
// -appended city buttons to fire off fetchCityWeather

//call functions
printCityList();