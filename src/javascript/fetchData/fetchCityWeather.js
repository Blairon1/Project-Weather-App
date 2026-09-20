/*
// References 
*/
const weatherCityInput = document.querySelector("#city-input");

/*
// States
*/

/*
// Implementation
*/

// Fetch Weather data for the city selected
async function fetchWeatherData() {}

// User presses enter after typing in a city
weatherCityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.value.length > 0) {
    event.preventDefault();

    console.log("Enter key pressed! Current value:", event.target.value);
  }
});
