var cityNameEl = document.querySelector("#cityName");
var userInputEl = document.querySelector("#userInput");
var wetherUrl = https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=55785c8317220fbb9098ae56f9cdac87&units=imperial



userInputEl.addEventListener('submit', formSubmitHandler);