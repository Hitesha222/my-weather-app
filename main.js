function formatDate(timestamp) {
  let now = new Date(timestamp);
  let dd = now.getDate();

  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  // return `${day}, ${month} ${dd} `;
  let currentDate = document.querySelector(".date");
  currentDate.innerHTML = `${day}, ${month} ${dd}`;
}

function forecastDay(timestamp) {
  let dayForecast = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayForecast.getDay()];

  return `${day}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let timeCurren = document.querySelector(".time");
  timeCurren.innerHTML = `${hour}:${minutes}`;
}

function displayWeather(response) {
  let country = response.data.sys.country;
  let citySearch = response.data.name;
  let longitudeW = response.data.coord.lon;
  let latitudeW = response.data.coord.lat;

  let iconElement = document.querySelector("#icon");
  document.querySelector(".city").innerHTML = `${citySearch}, ${country}`;
  celsiusTemperature = response.data.main.temp;

  document.querySelector(".date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector(".time").innerHTML = formatHours(
    response.data.dt * 1000
  );
  document.querySelector(".temp").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#desc").innerHTML =
    response.data.weather[0].description;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let apiKey = "0ba815334c7359de1226f0622b8ed758";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

function onSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityName").value;
  // console.log(city);
  searchCity(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", onSubmit);

function searchLocation(position) {
  let apiKey = "0ba815334c7359de1226f0622b8ed758";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  // console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#btnCurrentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);

  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let fahreinheitLink = document.querySelector("#fahrenheit-change");
fahreinheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-change");
celsiusLink.addEventListener("click", convertToCelsius);
