/*
// References 
*/
const weatherCityInput = document.querySelector("#city-input");

/*
// Implementation
*/

// Fetch Weather data for the city selected (Using Promises)
function fetchWeatherData(city) {
  const apiKey = "VSJJF7YPT92KEZD6LS3KXLS4V";
  const location = city;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}`;

  // Fetching data from endpoint
  fetch(`${url}?unitGroup=metric&key=${apiKey}&contentType=json`)
    .then((data) => {
      // Promise chaining, checking if there's a problem with fetching, otherwise we will return json
      if (!data.ok) {
        throw new Error("Network response was not ok");
      } else {
        return data.json(); // raw HTTP response stream, reads it to completion, and parses the text body as JSON into a native JavaScript object
      }
    })
    .then((data) => {
      // Handle the data returned from the first then method call
      console.log(data);
    })
    .catch((error) => {
      // Handle any errors fetching the data
      console.log(`Fetch Error:`, error);
    });
}

// User presses enter after typing in a city
weatherCityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.value.length > 0) {
    event.preventDefault();

    console.log("Enter key pressed! Current value:", event.target.value);
    fetchWeatherData(event.target.value);
  }
});
