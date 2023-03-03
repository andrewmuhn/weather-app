
//!psuedo code
//take input city from user entry and convert it into the applicable parameters to append to the request urls for both current and 5 day forecast
// - save city and attached urls to local storage
// - append button of city to search list so user can click on previously searched cities.
//extract needed information (temp, wind, humidity) from returned JSON object.
// - append above info into html document
//TODO: creath fetch request that accepts a URL varaible
const searchApi = () => {

    fetch(requestUrl)
        .then((response) => {

            return response.json();
        })
        .then((data) => {
            console.log('Fetch Response \n----------------');
            console.log(data);
        })

    //should take user inputs and extract applicable parmetrs and fire off functions to fetch geocode from city name.
    const handleFormSubmit = () => {

    }
    //fires fetch request for geocoded info. fires off functions to update and save local storage. fires off fetch for current weather and 5-day forecast
    const searchGeocode = () => {

    }
    //takes geocode info and fires of fetch request for current weather and 5-day weather.  fires off printWeatherData
    const searchCityWeather = () => {

    }
    //extracts values from retured JSON weather data and displays them in html file
    const printWeatherData = () => {

    }
    //save an an array of objects to local storage with user input as key and fetched geocode as value. fires off readromLocalStorage
    const saveToLocalStorage = () => {

    }
    //parses data from local storage. if no data then reurn an empty array.firest off printCityList
    const readFromLocalStorage = () => {

    }
    //take parsed data from local storage and save it in the form of a button that is appended to the search list
    const printCityList = () => {

    }

//TODO: create event handlers for:
// -search button to fire off handleFormSubmit
// -appended city buttons to fire off fetchCityWeather