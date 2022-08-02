var cityNameEl = document.querySelector("#cityName");
var userInputEl = document.querySelector("#userInput");
var weatherContainerEl = document.querySelector('#weather-container');
var forecastContainerEl = document.querySelector('#forecast-container');
var weatherEl = document.querySelector('#weather');
var previousCitiesEl = document.querySelector('#button-city');
var searchCity = document.querySelector('#search-city');
var savedCitiesEl = document.querySelector('#saved-cities');

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

    for (var i = 0; i < 5; i++) {
        var newDate = "";
        var day = data.daily[i];
        var max = day.temp.max;
        var min = day.temp.min;
        var average = Math.round((max + min) / 2);
        var tempForcast = average;
        var windForcast = day.wind_speed;
        var uvForcast = day.uvi;
        var humForcast = day.humidity;

        var tempElForcast = document.createElement('p');
        var windElForcast = document.createElement('p');
        var uvElForcast = document.createElement('p');
        var humElForcast = document.createElement('p');
        var divContainer = document.createElement('div');
        var h2Ele = document.createElement('h2');
        divContainer.className = "card5";

        tempElForcast.textContent = "Temperature: " + tempForcast;
        windElForcast.textContent = "Wind Speed: " + windForcast;
        uvElForcast.textContent = "UV Index: " + uvForcast;
        humElForcast.textContent = "Humidity: " + humForcast;
        h2Elem.textContent = newDate;

        divContainer.append(h2Elem, tempElForcast, windElForcast, uvElForcast, humElForcast);
        forecastContainerEl.append(divContainer);
    }
  })
}

var saveCity = function (city) {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem('cities', JSON.stringify(cities));
        displayStoredCities();
    }
}

var displayStoredCities = function () {
    var cities = JSON.parse(localStorage.getItem('cities')) || [];
    savedCitiesEl.innerHTML = null;
    for (var city of cities) {
        var cityBtn = document.createElement('button');
        cityBtn.dataset.city = city;
        cityBtn.className = 'btn';
        cityBtn.textContent = city;
        savedCitiesEl.append(cityBtn);
    }
}

previousEl.addEventListener('click', buttonHandler);
userInputEl.addEventListener("submit", formSubmitHandler);
displayStoredCities();