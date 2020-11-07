let now = new Date();
let date = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let currentDate = document.querySelector(".date");
currentDate.innerHTML = `${day}, ${month} ${date}`;

let timeCurren = document.querySelector(".time");
timeCurren.innerHTML = `${hour}:${minutes}`;

function displayWeather(response) {
  let country = response.data.sys.country;
  let citySearch = response.data.name;

  document.querySelector(".city").innerHTML = `${citySearch}, ${country}`;
  document.querySelector(".temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#precipitation").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#desc").innerHTML =
    response.data.weather[0].description;
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
