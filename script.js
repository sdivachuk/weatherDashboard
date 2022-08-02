var cityNameEl = document.querySelector("#cityName");
var userInputEl = document.querySelector("#userInput");
var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=55785c8317220fbb9098ae56f9cdac87&units=imperial`;

var GetWeather = function (value) {
  fetch(weatherUrl).then(function (response) {
    return response.json();
  });
};

function getCity(event) {
  event.preventDefault();
  getWeather(cityNameEl.value);
}

var formSubmitHandler = function (event) {
  event.preventDefault();
  var cityName = cityNameEl.value.trim();

  if (cityName) {
    getWeather(cityName);

    weatherContainerEl.textContent = "";
    cityNameEl.value = "";
  } else {
    alert("No city with that name found!");
  }
};

var buttonHandler = function (event) {
  var city = event.target.getAttribute("search-city");

  if (city) {
    getWeather(city);
    weatherContainerEl.textContent = "";
  }
};

var getCitysWeather = function (value) {
  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      showWeather(lat, lon);
      storeCity(value);
    });
};

function showWeather(lat, lon, timezone) {
  var date = dayjs().tz(timezone).format("M/D/YYYY");
  fetch(weatherUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    forecastContainerEl.innerHTML = '';
    var temp = data.current.temp;
    var wind = data.current.wind_speed;
    var uv = data.current.uvi;
    var humidity = data.current.humidity;
    var containerEl = document.createElement('div');
    var h2El = document.createElement('h2');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var uvEl = document.createElement('p');
    var humEl = document.createElement('p');


    tempEl.textContent = "Temperature: " + temp;
    windEl.textContent = "Wind Speed: " + wind;
    uvEl.textContent = "UV Index: " + uv;
    humEl.textContent = "Humidity: " + humidity;

    h2El.textContent = date

    containerEl.append(h2El, tempEl, windEl, uvEl, humEl);
    weatherContainerEl.append(containerEl);

  })
}







userInputEl.addEventListener("submit", formSubmitHandler);
