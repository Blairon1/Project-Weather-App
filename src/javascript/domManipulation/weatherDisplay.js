/*
// References 
*/
const weatherCityInput = document.querySelector("#city-input");
const homePage = document.querySelector(".home-page");
const weatherSearchBar = document.querySelector("#weather-task-form");

/*
// Implementation
*/
function updateWeatherDisplay(weatherData) {
  homePage.replaceChildren();

  /*
    // CONSTRUCT THE HEADER CONTAINING THE SEARCH BAR TO LOOK FOR OTHER CITY WEATHER
    */
  const headerSearchBar = document.createElement("div");
  headerSearchBar.id = "header-searchbar";
  headerSearchBar.appendChild(weatherSearchBar);
  homePage.appendChild(headerSearchBar);

  /*
    // CONSTRUCT THE BODY SECTION OF THE NEWLY DISPLAYED WEATHER DATA
    */

  /*
    // CONSTRUCT THE FOOTER SECTION CONTAINING MINI TABS OF EACH DAYS WEATHER AND TEMPERATURE
    */
}
