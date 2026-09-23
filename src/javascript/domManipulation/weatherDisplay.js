import loadingComponent from "../miscMethods/loadingComponent.js";
import { parseISO, format } from "date-fns";

// References
const homePage = document.querySelector(".home-page");

// State
let currentMeasurement = "celsius";

// Implementation

function getWeatherIcon(dayConditions) {
  if (
    dayConditions == "clear-day" ||
    dayConditions == "clear-night" ||
    dayConditions == "clear"
  ) {
    return "assets/icons/day.svg";
  } else if (
    dayConditions == "partly-cloudy-day" ||
    dayConditions == "partly-cloudy-night" ||
    dayConditions == "partially cloudy"
  ) {
    return "assets/icons/partly-cloudy.svg";
  } else if (dayConditions == "rain-snow") {
    return "assets/icons/rain-snow.svg";
  } else if (dayConditions == "rain") {
    return "assets/icons/rain.svg";
  } else if (dayConditions == "cloudy") {
    return "assets/icons/cloudy.svg";
  } else if (dayConditions == "fog" || dayConditions == "wind") {
    return "assets/icons/fog-wind.svg";
  } else if (
    dayConditions == "sleet" ||
    dayConditions == "hail" ||
    dayConditions == "thunder" ||
    dayConditions == "thunder-rain" ||
    dayConditions == "thunder-showers-day" ||
    dayConditions == "thunder-showers-night"
  ) {
    return "assets/icons/thunder-sleet-hail.svg";
  } else if (
    dayConditions == "showers-day" ||
    dayConditions == "showers-night" ||
    dayConditions == "snow-showers-day" ||
    dayConditions == "snow-showers-night" ||
    dayConditions == "rain-snow-showers-day" ||
    dayConditions == "rain-snow-showers-night"
  ) {
    return "assets/icons/day.svg";
  } else {
    return "assets/icons/weather.svg";
  }
}

export function updateWeatherDisplay(
  weatherData,
  fetchWeatherData,
  measurement,
) {
  homePage.replaceChildren();

  const weatherWebpageWrapper = document.createElement("div");
  weatherWebpageWrapper.id = "weather-webpage-wrapper";

  // Header search bar
  const headerSearchBar = document.createElement("div");
  headerSearchBar.id = "header-searchbar";

  const weatherSearchForm = document.createElement("form");
  weatherSearchForm.className = "weather-search-form";

  const weatherSearchInput = document.createElement("input");
  weatherSearchInput.className = "weather-search-input";
  weatherSearchInput.type = "text";
  weatherSearchInput.placeholder = weatherData.address;
  weatherSearchInput.minLength = "1";
  weatherSearchInput.maxLength = "169";
  weatherSearchInput.required = true;

  const toggleSign = document.createElement("img");
  toggleSign.src =
    measurement == "celsius"
      ? "assets/icons/temperature-celsius.svg"
      : "assets/icons/temperature-fahrenheit.svg";
  toggleSign.alt = "";
  toggleSign.id = "toggle-sign";

  weatherSearchForm.append(weatherSearchInput, toggleSign);
  headerSearchBar.appendChild(weatherSearchForm);

  // Main weather display
  const weatherDisplayWrapper = document.createElement("div");
  weatherDisplayWrapper.id = "weather-display-wrapper";

  // Left side
  const weatherDisplayLeft = document.createElement("div");
  weatherDisplayLeft.id = "weather-display-left";

  const weatherHeaderLeft = document.createElement("div");
  weatherHeaderLeft.className = "weather-header";

  const currentDateLeft = document.createElement("p");
  currentDateLeft.className = "current-date";
  currentDateLeft.textContent =
    format(parseISO(weatherData.days[0].datetime), "EEEE, MMMM d") ||
    "Monday, September 21";

  const cityNameLeft = document.createElement("p");
  cityNameLeft.className = "city-name";
  cityNameLeft.textContent = weatherData.resolvedAddress || "Toronto, ON";

  weatherHeaderLeft.append(currentDateLeft, cityNameLeft);

  const weatherIconContainer = document.createElement("div");
  weatherIconContainer.id = "current-date-weather-icon-container";

  const currentWeatherIcon = document.createElement("img");
  currentWeatherIcon.src = getWeatherIcon(weatherData.days[0].icon);
  currentWeatherIcon.alt = "Weather Icon";
  currentWeatherIcon.id = "current-date-weather-icon";

  weatherIconContainer.appendChild(currentWeatherIcon);

  const weatherBodyLeft = document.createElement("div");
  weatherBodyLeft.className = "weather-display-body";
  weatherBodyLeft.id = "weather-body-left";

  const weatherDescription = document.createElement("p");
  weatherDescription.id = "weather-description";
  weatherDescription.textContent =
    weatherData.currentConditions?.conditions || "Clear Skies";

  const currentTemperature = document.createElement("p");
  currentTemperature.id = "current-date-temperature";
  currentTemperature.textContent =
    measurement == "celsius"
      ? `${Math.round(weatherData.currentConditions.temp)}°C`
      : ` ${Math.round(weatherData.currentConditions.temp * (9 / 5) + 32)}°F`;

  weatherBodyLeft.append(weatherDescription, currentTemperature);
  weatherDisplayLeft.append(
    weatherHeaderLeft,
    weatherIconContainer,
    weatherBodyLeft,
  );

  // Right side
  const weatherDisplayRight = document.createElement("div");
  weatherDisplayRight.id = "weather-display-right";

  const weatherHeaderRight = document.createElement("div");
  weatherHeaderRight.className = "weather-header";

  const currentDateRight = document.createElement("p");
  currentDateRight.className = "current-date";
  currentDateRight.textContent =
    format(parseISO(weatherData.days[0].datetime), "EEEE, MMMM d") ||
    "Monday, September 21";

  const cityNameRight = document.createElement("p");
  cityNameRight.className = "city-name";
  cityNameRight.textContent = weatherData.resolvedAddress || "Toronto, ON";

  weatherHeaderRight.append(currentDateRight, cityNameRight);

  const weatherBodyRight = document.createElement("div");
  weatherBodyRight.className = "weather-display-body";
  weatherBodyRight.id = "weather-body-right";

  const weatherInfo = [
    ["Wind", `${weatherData.days[0].windspeed}m/s`],
    ["Humidity", `${Math.round(weatherData.days[0].humidity)}%`],
    ["Sunset", `${weatherData.days[0].sunset}`],
    ["Sunrise", `${weatherData.days[0].sunrise}`],
    [
      "Precipitation probability",
      `${weatherData.currentConditions.precipprob}%`,
    ],
  ];

  weatherInfo.forEach(([label, value]) => {
    const weatherInfoTab = document.createElement("div");
    weatherInfoTab.className = "weather-info-tab";

    const weatherInfoLabel = document.createElement("p");
    weatherInfoLabel.className = "weather-info-text";
    weatherInfoLabel.textContent = label;

    const weatherInfoValue = document.createElement("p");
    weatherInfoValue.className = "weather-info-text";
    weatherInfoValue.textContent = value;

    weatherInfoTab.append(weatherInfoLabel, weatherInfoValue);
    weatherBodyRight.appendChild(weatherInfoTab);
  });

  weatherDisplayRight.append(weatherHeaderRight, weatherBodyRight);

  // Daily weather
  const dailyWeatherSection = document.createElement("div");
  dailyWeatherSection.id = "daily-weather-section";

  const dailyWeather = [
    [
      getWeatherIcon(weatherData.days[0].icon),
      `${format(parseISO(weatherData.days[0].datetime), "E")}`,
      measurement == "celsius"
        ? `${Math.round(weatherData.days[0].tempmin)}°C`
        : ` ${Math.round(weatherData.days[0].tempmin * (9 / 5) + 32)}°F`,
      measurement == "celsius"
        ? `${Math.round(weatherData.days[0].tempmax)}°C`
        : ` ${Math.round(weatherData.days[0].tempmax * (9 / 5) + 32)}°F`,
    ],
    [
      getWeatherIcon(weatherData.days[1].icon),
      `${format(parseISO(weatherData.days[1].datetime), "E")}`,
      measurement == "celsius"
        ? `${Math.round(weatherData.days[1].tempmin)}°C`
        : ` ${Math.round(weatherData.days[1].tempmin * (9 / 5) + 32)}°F`,
      measurement == "celsius"
        ? `${Math.round(weatherData.days[1].tempmax)}°C`
        : ` ${Math.round(weatherData.days[1].tempmax * (9 / 5) + 32)}°F`,
    ],
    [
      getWeatherIcon(weatherData.days[2].icon),
      `${format(parseISO(weatherData.days[2].datetime), "E")}`,
      measurement == "celsius"
        ? `${Math.round(weatherData.days[2].tempmin)}°C`
        : ` ${Math.round(weatherData.days[2].tempmin * (9 / 5) + 32)}°F`,
      measurement == "celsius"
        ? `${Math.round(weatherData.days[2].tempmax)}°C`
        : ` ${Math.round(weatherData.days[2].tempmax * (9 / 5) + 32)}°F`,
    ],
    [
      getWeatherIcon(weatherData.days[3].icon),
      `${format(parseISO(weatherData.days[3].datetime), "E")}`,
      measurement == "celsius"
        ? `${Math.round(weatherData.days[3].tempmin)}°C`
        : ` ${Math.round(weatherData.days[3].tempmin * (9 / 5) + 32)}°F`,
      measurement == "celsius"
        ? `${Math.round(weatherData.days[3].tempmax)}°C`
        : ` ${Math.round(weatherData.days[3].tempmax * (9 / 5) + 32)}°F`,
    ],
    [
      getWeatherIcon(weatherData.days[4].icon),
      `${format(parseISO(weatherData.days[4].datetime), "E")}`,
      measurement == "celsius"
        ? `${Math.round(weatherData.days[4].tempmin)}°C`
        : ` ${Math.round(weatherData.days[4].tempmin * (9 / 5) + 32)}°F`,
      measurement == "celsius"
        ? `${Math.round(weatherData.days[4].tempmax)}°C`
        : ` ${Math.round(weatherData.days[4].tempmax * (9 / 5) + 32)}°F`,
    ],
    [
      getWeatherIcon(weatherData.days[5].icon),
      `${format(parseISO(weatherData.days[5].datetime), "E")}`,
      measurement == "celsius"
        ? `${Math.round(weatherData.days[5].tempmin)}°C`
        : ` ${Math.round(weatherData.days[5].tempmin * (9 / 5) + 32)}°F`,
      measurement == "celsius"
        ? `${Math.round(weatherData.days[5].tempmax)}°C`
        : ` ${Math.round(weatherData.days[5].tempmax * (9 / 5) + 32)}°F`,
    ],
    [
      getWeatherIcon(weatherData.days[6].icon),
      `${format(parseISO(weatherData.days[6].datetime), "E")}`,
      measurement == "celsius"
        ? `${Math.round(weatherData.days[6].tempmin)}°C`
        : ` ${Math.round(weatherData.days[6].tempmin * (9 / 5) + 32)}°F`,
      measurement == "celsius"
        ? `${Math.round(weatherData.days[6].tempmax)}°C`
        : ` ${Math.round(weatherData.days[6].tempmax * (9 / 5) + 32)}°F`,
    ],
  ];

  dailyWeather.forEach(([icon, day, minTemp, maxTemp]) => {
    const dailyWeatherContainer = document.createElement("div");
    dailyWeatherContainer.className = "daily-weather-containers";

    const weatherIcon = document.createElement("img");
    weatherIcon.src = icon;
    weatherIcon.alt = "Weather Icon";
    weatherIcon.className = "weather-icon";

    const dayText = document.createElement("p");
    dayText.className = "days";
    dayText.textContent = day;

    const minTemperature = document.createElement("p");
    minTemperature.className = "min-temp";
    minTemperature.textContent = minTemp;

    const maxTemperature = document.createElement("p");
    maxTemperature.className = "max-temp";
    maxTemperature.textContent = maxTemp;

    dailyWeatherContainer.append(
      weatherIcon,
      dayText,
      minTemperature,
      maxTemperature,
    );
    dailyWeatherSection.appendChild(dailyWeatherContainer);
  });

  weatherDisplayWrapper.append(
    weatherDisplayLeft,
    weatherDisplayRight,
    dailyWeatherSection,
  );
  weatherWebpageWrapper.append(headerSearchBar, weatherDisplayWrapper);
  homePage.appendChild(weatherWebpageWrapper);

  // Search from the weather page
  weatherSearchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = weatherSearchInput.value.trim();

    if (city.length > 0) {
      const newWeatherData = await fetchWeatherData(city);
      if (newWeatherData == undefined || newWeatherData == null) {
        weatherSearchForm.style.placeholder = "Invalid Search!";
      } else {
        setTimeout(() => {
          updateWeatherDisplay(newWeatherData, fetchWeatherData, "celsius");
        }, 320);
        loadingComponent();
      }
    }
  });

  toggleSign.addEventListener("click", () => {
    if (currentMeasurement == "celsius") {
      currentMeasurement = "fahrenheit";
    } else {
      currentMeasurement = "celsius";
    }
    updateWeatherDisplay(weatherData, fetchWeatherData, currentMeasurement);
  });
}
