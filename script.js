var cityNameEl = document.querySelector(".cityName");
var userInputEl = document.querySelector("#userInput");
var weatherContainerEl = document.querySelector('#weatherContainer');
var forecastContainerEl = document.querySelector('#forecastContainer');
var weatherEl = document.querySelector('#weather');
var previousCitiesEl = document.querySelector('#previousCities');
var searchCity = document.querySelector('#searchCity');
var savedCitiesEl = document.querySelector('#savedCities');
// var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=55785c8317220fbb9098ae56f9cdac87`
// var weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=55785c8317220fbb9098ae56f9cdac87&units=imperial`;

var getWeather = function (value) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=55785c8317220fbb9098ae56f9cdac87`).then(function (response) {
    return response.json();
  }).then(apiResponse => {
    console.log(apiResponse);
    getCitysWeather(apiResponse[0].lat, apiResponse[0].lon);
    showWeather(apiResponse[0].lat, apiResponse[0].lon);
  })
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
    saveCity(cityName);
    weatherContainerEl.textContent = "";
    cityNameEl.value = "";
  } else {
    alert("No city with that name found!");
  }
};

var buttonHandler = function () {
//   var city = event.target.getAttribute("#searchCity");
var city = document.querySelector("#city").value;
  if (city) {
    getWeather(city);
    weatherContainerEl.textContent = "";
  }
};

var getCitysWeather = function (lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=55785c8317220fbb9098ae56f9cdac87&units=imperial`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    //   saveCity(value);
    console.log(data);
    });
};

function showWeather(lat, lon) {
  var date = moment().format('MM/DD/YY');
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=55785c8317220fbb9098ae56f9cdac87&units=imperial`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    forecastContainerEl.innerHTML = " ";
    var temp = data.current.temp;
    var wind = data.current.wind_speed;
    var uv = data.current.uvi;
    var humidity = data.current.humidity;
    var containerEl = document.createElement("div");
    var h2El = document.createElement("h2");
    var tempEl = document.createElement("p");
    var windEl = document.createElement("p");
    var uvEl = document.createElement("p");
    var humEl = document.createElement("p");
    containerEl.className = "forcastCard";

    tempEl.textContent = "Temperature: " + temp;
    windEl.textContent = "Wind Speed: " + wind;
    uvEl.textContent = "UV Index: " + uv;
    humEl.textContent = "Humidity: " + humidity;

    h2El.textContent = date

    containerEl.append(h2El, tempEl, windEl, uvEl, humEl);
    weatherContainerEl.append(containerEl);

    for (var i = 1; i < 6; i++) {
        var newDate = moment.unix(data.daily[i].dt).format("MM/DD/YY");
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
        var h2Elem = document.createElement('h2');
        divContainer.className = "cardContainer";

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
    var cities = JSON.parse(localStorage.getItem("cities")) || [];
    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities));
        displayStoredCities();
    }
}

var displayStoredCities = function () {
 
    var cities = JSON.parse(localStorage.getItem("cities")) || [];
    savedCitiesEl.innerHTML = null;
    for (var city of cities) {
        var cityBtn = document.createElement("button");
        cityBtn.dataset.city = city;
        cityBtn.className = "btn";
        cityBtn.textContent = city;
        cityBtn.addEventListener("click", function(){getWeather(city)})
        savedCitiesEl.append(cityBtn);

    }
}

previousCitiesEl.addEventListener("click", buttonHandler);
userInputEl.addEventListener("submit", formSubmitHandler);
displayStoredCities();