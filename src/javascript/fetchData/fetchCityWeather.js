import { updateWeatherDisplay } from "../domManipulation/weatherDisplay.js";
import loadingComponent from "../miscMethods/loadingComponent.js";

/*
// References 
*/
const weatherLocationInput = document.querySelector("#location-input");

/*
// Implementation
*/

// Fetch Weather data for the city selected (Using Promises)
async function fetchWeatherData(city) {
  const apiKey = "VSJJF7YPT92KEZD6LS3KXLS4V";
  const location = city;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}`;

  try {
    // Fetching data from endpoint
    const response = await fetch(
      `${url}?unitGroup=metric&key=${apiKey}&contentType=json`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.log("Failed to fetch weather data:", error);
  }
}

// User presses enter after typing in a location
weatherLocationInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter" && event.target.value.length > 0) {
    event.preventDefault();

    console.log("Enter key pressed! Current value:", event.target.value);
    const acquiredWeatherData = await fetchWeatherData(event.target.value);
    console.log(acquiredWeatherData);

    if (acquiredWeatherData == undefined || acquiredWeatherData == null) {
      weatherLocationInput.style.placeholder = "Invalid Search!";
    } else {
      setTimeout(() => {
        updateWeatherDisplay(acquiredWeatherData, fetchWeatherData, "celsius");
      }, 320);
      loadingComponent();
    }
  }
});
