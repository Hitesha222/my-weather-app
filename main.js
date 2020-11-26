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
  return `${day}, ${month} ${dd} `;
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

  return `${hours}:${minutes}`;
}

function displayWeather(response) {
  let country = response.data.sys.country;
  let citySearch = response.data.name;

  let longitudeW = response.data.coord.lon;
  let latitudeW = response.data.coord.lat;
  let apiKey = "0ba815334c7359de1226f0622b8ed758";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitudeW}&lon=${longitudeW}&exclude=minutely,hourly&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);

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
  // iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(responce) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 1; index < 6; index++) {
    forecast = responce.data.daily[index];

    forecastElement.innerHTML += `<div class="col">
			<div class="card">
				<div class="card-body text-center" >
          <h5 class="card-title">
                ${forecastDay(forecast.dt * 1000)}
          </h5>
        
          <img
             src="http://openweathermap.org/img/wn/${
               forecast.weather[0].icon
             }@2x.png" style="height:50px";
          />

          <p class="card-text"style="height:10px" >
           ${Math.round(forecast.temp.max)}°/
           ${Math.round(forecast.temp.min)}°
          </p>

			</div>
    </div>`;
  }
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
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "0ba815334c7359de1226f0622b8ed758";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);

  //display current forecast
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

  celsiusLink.classList.remove("active");
  fahreinheitLink.classList.add("active");

  fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  console.log(fahrenheiTemperature);
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);

  // temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahreinheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("form");
form.addEventListener("submit", onSubmit);

let fahreinheitLink = document.querySelector("#fahrenheit-change");
fahreinheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-change");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("Lisbon");
