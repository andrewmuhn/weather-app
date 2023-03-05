# <Weather-App>

## Description

- The goal was to deploy a simple weather app that a user could input a city name the ui would display the current weather as well as a basic 5-day forecast
- I built this project to practice fetch requests from 3rd party server APIs
- This allows me to develop web application that don't soley rely on the data stored within the source code.
- I learned how to make dynamic fetch requests based off of the server response
- I learned how to use the native Date() method vs a 3rd party such as dayjs
- I learned how to use vanilla js to interact with bootstrap modals instead of relying on jquery

## Usage

[Link to deployed application](https://andrewmuhn.github.io/weather-app/)

Landing Page
![Landing Page](/assets/images/landing-page.png)

After Search, weather data is display and city name is saved to list
![After Search](/assets/images/after-search.png)

Second Search, new weather data is displayed and city name is appended to the top of the list
![Second Search](/assets/images/second-search.png)

After refreshing the page, weather data disappears but city lists persists
![After Refresh](/assets/images/city-list-persists.png)

If the city searched doesn't exist an error message appears
![Bad Search](/assets/images/bad-search.png)


## Credits

Project of Andrew Muhn  
as part of UofO EdX Bootcamp

Integrated:  
[Bootstrap](https://getbootstrap.com/)  
[OpenWeatherApi](https://openweathermap.org/api)  
  

Credits to tutorials and forums used in making this web app:  
[How to use Date() and format it.](https://linuxhint.com/format-date-as-yyyy-mm-dd-in-javascript/#:~:text=To%20set%20the%20format%20of,and%20%E2%80%9CgetDate()%E2%80%9D%20methods.)  
[How to format Date() into 2 digit format ex: 03/06/2023 vs 3/6/2023](https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format)  
[How to use vanilla js to call bootsrap modal](https://www.youtube.com/watch?v=XUhdzIO6lgg&ab_channel=ByteGrad)  




