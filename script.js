"use strict";
import { isoCountries } from "./iso.js";

const weatherDisplayData = document.querySelector(".section_left");
const weatherDisplayDetails = document.querySelector(".section_right-data");
const homeSearch = document.querySelector(".searchInputIcon");
const homeInput = document.querySelector(".searchInput");
const mainSearch = document.querySelector(".searchButton");
const mainInput = document.querySelector(".searchCity");
const home = document.querySelector(".container");
const backgroundBGM = document.querySelector(".header");

const renderWeatherData = function (city, data) {
  const html = ` 
  <div class="section_left-info">
    <h1 class="section_left-info-temperature">${
      data.current_weather.temperature
    }${data.hourly_units.temperature_2m[0]}</h1>
      <div class="section_left-info-data">
        <div class="section_left-info-data-top">
          <h3>${capitalize(city)}</h3>
          <svg class="icon icon-${
            renderBackgroundImage(data.current_weather.weathercode)[1]
          }">
            <use xlink:href="/icomoon/sprite.svg#icon-${
              renderBackgroundImage(data.current_weather.weathercode)[1]
            }"></use>
          </svg>
        </div>
      <div class="section_left-info-data-bottom">
        <p>${time(data.current_weather.time)}UTC - ${getDay()}, ${
    date(data.current_weather.time)[2]
  } ${date(data.current_weather.time)[1]} '${
    date(data.current_weather.time)[0]
  }</p>
        <p class="WeatherCode">${
          renderBackgroundImage(data.current_weather.weathercode)[0]
        }</p>
      </div>
    </div>
  </div>
  `;
  weatherDisplayData.insertAdjacentHTML("beforeend", html);
};

const renderWeatherDetails = function (data) {
  const html = `     
    <table style="width: 100%">
      <tr>
        <td height="40">Wind Speed</td>
        <td height="40">${data.current_weather.windspeed}${
    data.hourly_units.windspeed_10m
  }</td>
      </tr>
      <tr>
        <td height="40">Precipitation</td>
        <td height="40">${
          data.hourly.precipitation[time(data.current_weather.time)]
        }${data.hourly_units.precipitation}</td>
      </tr>
      <tr>
        <td height="40">Relative Humidity</td>
        <td height="40">${
          data.hourly.relativehumitidy_2m[time(data.current_weather.time)]
        }${data.hourly_units.relativehumitidy_2m}</td>
      </tr>
      <tr>
        <td height="40">Sealevel Pressure</td>
        <td height="40">${
          data.hourly.pressure_msl[time(data.current_weather.time)]
        }${data.hourly_units.pressure_msl}</td>
      </tr>
      <tr>
        <td height="40">Cloud Cover</td>
        <td height="40">${
          data.hourly.cloudcover[time(data.current_weather.time)]
        }${data.hourly_units.cloudcover}</td>
      </tr>
      <tr>
        <td height="40">Freezing level height</td>
        <td height="40">${
          data.hourly.freezinglevel_height[time(data.current_weather.time)]
        }${data.hourly_units.freezinglevel_height}</td>
      </tr>      
    </table> 
  `;
  weatherDisplayDetails.insertAdjacentHTML("beforeend", html);
};

const renderBackgroundImage = function (code) {
  if (code == 0) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_0 ClearSky.jpg")`;
    document.body.style.backgroundColor = "rgb(0, 162, 255)";
    return ["Sunny", "sun2"];
  } else if (code == 1) {
    backgroundBGM.style.backgroundImage = `url("Images/code_1.jpg")`;
    document.body.style.backgroundColor = "rgb(0, 162, 255)";
    return ["Clear", "sun2"];
  } else if (code == 2) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_2.jpg")`;
    document.body.style.backgroundColor = "rgb(39, 39, 39)";
    return ["Partly Cloudy", "cloudy2"];
  } else if (code == 3) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_3.png")`;
    document.body.style.backgroundColor = "rgb(0, 13, 49)";
    return ["Overcast", "cloud3"];
  } else if (code == 45) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_45.jpg")`;
    document.body.style.backgroundColor = "rgb(136, 136, 136)";
    return ["Fog", "weather3"];
  } else if (code == 48) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_46.jpg")`;
    document.body.style.backgroundColor = "rgb(240, 240, 240)";
    return ["Foggy", "weather1"];
  } else if (code == 51) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_51.jpg")`;
    document.body.style.backgroundColor = "rgb(0, 54, 134)";
    return ["Light Drizzle", "rainy1"];
  } else if (code == 53) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_53.jpg")`;
    document.body.style.backgroundColor = "rgb(202, 202, 202)";
    return ["Moderate Drizzle", "rainy"];
  } else if (code == 55) {
    backgroundBGM.style.backgroundImage = `url("Images/Codee_57.jpg")`;
    document.body.style.backgroundColor = "rgb(15, 80, 110)";
    return ["Dense Drizzle", "rainy"];
  } else if (code == 56) {
    backgroundBGM.style.backgroundImage = `url("Images/Codee_57.jpg")`;
    document.body.style.backgroundColor = "rgb(15, 80, 110)";
    return ["Light Drizzle", "rainy1"];
  } else if (code == 57) {
    backgroundBGM.style.backgroundImage = `url("Images/Codee_57.jpg")`;
    document.body.style.backgroundColor = "rgb(15, 80, 110)";
    return ["Moderate Drizzle", "rainy"];
  } else if (code == 61) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_61.jpg")`;
    document.body.style.backgroundColor = "rgba(0, 16, 37, 0.884)";
    return ["Light Rain", "rainy1"];
  } else if (code == 63) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_65.jpg")`;
    document.body.style.backgroundColor = "rgba(31, 70, 95, 0.884)";
    return ["Moderate Rain", "rainy1"];
  } else if (code == 65) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_65.jpg")`;
    document.body.style.backgroundColor = "rgba(31, 70, 95, 0.884)";
    return ["Heavy Rain", "rainy1"];
  } else if (code == 66) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_57.jpg")`;
    document.body.style.backgroundColor = "rgba(148, 148, 148, 0.897)";
    return ["Light Snow", "weather"];
  } else if (code == 67) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_57.jpg")`;
    document.body.style.backgroundColor = "rgba(148, 148, 148, 0.897)";
    return ["Heavy Snow", "weather"];
  } else if (code == 71) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_57.jpg")`;
    document.body.style.backgroundColor = "rgba(148, 148, 148, 0.897)";
    return ["Light Snowfall", "weather"];
  } else if (code == 73) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_57.jpg")`;
    document.body.style.backgroundColor = "rgba(148, 148, 148, 0.897)";
    return ["Moderate Snowfall", "weather"];
  } else if (code == 75) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_57.jpg")`;
    document.body.style.backgroundColor = "rgba(148, 148, 148, 0.897)";
    return ["Heavy Snowfall", "weather"];
  } else if (code == 77) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_57.jpg")`;
    document.body.style.backgroundColor = "rgba(148, 148, 148, 0.897)";
    return ["Snow Grains", "snowflake"];
  } else if (code == 80) {
    backgroundBGM.style.backgroundImage = `url("Images/Codee_57.jpg")`;
    document.body.style.backgroundColor = "rgb(15, 80, 110)";
    return ["Light Rain", "rainy1"];
  } else if (code == 81) {
    backgroundBGM.style.backgroundImage = `url("Images/Codee_57.jpg")`;
    document.body.style.backgroundColor = "rgb(15, 80, 110)";
    return ["Moderate Rain", "rainy1"];
  } else if (code == 82) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_65.jpg")`;
    document.body.style.backgroundColor = "rgba(31, 70, 95, 0.884)";
    return ["Heavy Rain", "rainy1"];
  } else if (code == 85) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_57.jpg")`;
    document.body.style.backgroundColor = "rgb(0, 58, 97)";
    return ["Light Snowfall", "weather"];
  } else if (code == 86) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_57.jpg")`;
    document.body.style.backgroundColor = "rgba(148, 148, 148, 0.897)";
    return ["Heavy Snowfall", "weather"];
  } else if (code == 95) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_95.jpg")`;
    document.body.style.backgroundColor = "rgb(46, 46, 46)";
    return ["Light ThunderStorm", "lightning3"];
  } else if (code == 96) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_95.jpg")`;
    document.body.style.backgroundColor = "rgb(46, 46, 46)";
    return ["ThunderStorm", "lightning4"];
  } else if (code == 99) {
    backgroundBGM.style.backgroundImage = `url("Images/Code_96.jpg")`;
    document.body.style.backgroundColor = "rgb(160, 160, 160)";
    return ["Heavy ThunderStorm", "lightning2"];
  }
};

const countryCode = function (countryCode) {
  for (const [key, value] of Object.entries(isoCountries)) {
    if (value === countryCode) {
      return key;
    }
  }
};

const getDay = function () {
  var d = new Date();
  var n = d.getDay();
  if (n == 0) {
    return "Sunday";
  } else if (n == 1) {
    return "Monday";
  } else if (n == 2) {
    return "Tuesday";
  } else if (n == 3) {
    return "Wednesday";
  } else if (n == 4) {
    return "Thursday";
  } else if (n == 5) {
    return "Friday";
  } else if (n == 6) {
    return "Saturday";
  }
};

const time = function (data) {
  const code = data.slice(11, 13);
  if (code[0] == 0) {
    return code[1];
  } else {
    return code;
  }
};

const date = function (data) {
  const year = data.slice(2, 4);
  const monthNumber = data.slice(5, 7);
  const day = data.slice(8, 10);
  let month = "";
  if (monthNumber == 1) {
    month = "Jan";
  } else if (monthNumber == 2) {
    month = "Feb";
  } else if (monthNumber == 3) {
    month = "Mar";
  } else if (monthNumber == 4) {
    month = "Apr";
  } else if (monthNumber == 5) {
    month = "May";
  } else if (monthNumber == 6) {
    month = "June";
  } else if (monthNumber == 7) {
    month = "July";
  } else if (monthNumber == 8) {
    month = "Aug";
  } else if (monthNumber == 9) {
    month = "Sep";
  } else if (monthNumber == 10) {
    month = "Oct";
  } else if (monthNumber == 11) {
    month = "Nov";
  } else if (monthNumber == 12) {
    month = "Dec";
  }
  return [year, month, day];
};

const capitalize = function (input) {
  var words = input.split(" ");
  var CapitalizedWords = [];
  words.forEach((element) => {
    CapitalizedWords.push(
      element[0].toUpperCase() + element.slice(1, element.length)
    );
  });
  return CapitalizedWords.join(" ");
};

const weatherForecast = (async function () {
  try {
    const country = await fetch(
      "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json"
    );
    const countryData = await country.json();

    let countryCount = 0;
    let searchCount = 0;

    homeSearch.addEventListener("click", function () {
      home.style.display = "none";
      backgroundBGM.style.display = "flex";
      console.log(countryData);
      searchCount++;
      if (searchCount > 1) {
        document.querySelector(".section_right-data").textContent = "";
        document.querySelector(".section_left").innerHTML = "";
        for (let i = 0; i < countryData.length; i++) {
          if (countryData[i].name == capitalize(homeInput.value)) {
            fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${countryData[i].latitude}&longitude=${countryData[i].longitude}&hourly=temperature_2m,relativehumitidy_2m,pressure_msl,precipitation,weathercode,cloudcover,windspeed_10m,freezinglevel_height&current_weather=true`
            )
              .then(function (response) {
                return response.json();
              })
              .then(function (weatherData) {
                renderWeatherData(homeInput.value, weatherData);
                renderWeatherDetails(weatherData);
                renderBackgroundImage(weatherData.current_weather.weathercode);
              });
          } else {
          }
        }
      } else {
        for (let i = 0; i < countryData.length; i++) {
          if (countryData[i].name == capitalize(homeInput.value)) {
            countryCount++;
            console.log(countryCount);
            if (countryCount > 1) {
              const searchCountries = prompt(
                `Seems like there are more than one ${homeInput.value} in this world, Please enter the country name.`
              );
              const searchCountry =
                searchCountries[0].tolowerCase() + searchCountries.slice(1);
              const code = countryCode(searchCountry);
              document.querySelector(".section_right-data").textContent = "";
              document.querySelector(".section_left").innerHTML = "";
              console.log(countryData[i].country_code);
              if (countryData[i].country_code == code) {
                fetch(
                  `https://api.open-meteo.com/v1/forecast?latitude=${countryData[i].latitude}&longitude=${countryData[i].longitude}&hourly=temperature_2m,relativehumitidy_2m,pressure_msl,precipitation,weathercode,cloudcover,windspeed_10m,freezinglevel_height&current_weather=true`
                )
                  .then(function (response) {
                    return response.json();
                  })
                  .then(function (weatherData) {
                    renderWeatherData(homeInput.value, weatherData);
                    renderWeatherDetails(weatherData);
                    renderBackgroundImage(
                      weatherData.current_weather.weathercode
                    );
                  });
                break;
              } else {
                break;
              }
            } else {
            }
            fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${countryData[i].latitude}&longitude=${countryData[i].longitude}&hourly=temperature_2m,relativehumitidy_2m,pressure_msl,precipitation,weathercode,cloudcover,windspeed_10m,freezinglevel_height&current_weather=true`
            )
              .then(function (response) {
                return response.json();
              })
              .then(function (weatherData) {
                renderWeatherData(homeInput.value, weatherData);
                renderWeatherDetails(weatherData);
                renderBackgroundImage(weatherData.current_weather.weathercode);
              });
          } else {
          }
        }
      }
    });
    //Main Data page
    mainSearch.addEventListener("click", function () {
      searchCount++;
      console.log(searchCount);
      if (searchCount > 1) {
        document.querySelector(".section_right-data").textContent = "";
        document.querySelector(".section_left").innerHTML = "";
        countryCount = 0;
        for (let i = 0; i < countryData.length; i++) {
          if (countryData[i].name == capitalize(mainInput.value)) {
            countryCount++;
            if (countryCount > 1) {
              const searchCountries = prompt(
                `Seems like there are more than one ${mainInput.value} in this world, Please enter the country name.. `
              );
              const searchCountry =
                searchCountries[0].toLowerCase() + searchCountries.slice(1);
              const code = countryCode(searchCountry);
              document.querySelector(".section_right-data").textContent = "";
              document.querySelector(".section_left").innerHTML = "";
              console.log(countryData[i].country_code);
              if (countryData[i].country_code == code) {
                fetch(
                  `https://api.open-meteo.com/v1/forecast?latitude=${countryData[i].latitude}&longitude=${countryData[i].longitude}&hourly=temperature_2m,relativehumitidy_2m,pressure_msl,precipitation,weathercode,cloudcover,windspeed_10m,freezinglevel_height&current_weather=true`
                )
                  .then(function (response) {
                    return response.json();
                  })
                  .then(function (weatherData) {
                    renderWeatherData(mainInput.value, weatherData);
                    renderWeatherDetails(weatherData);
                    renderBackgroundImage(
                      weatherData.current_weather.weathercode
                    );
                  });
                break;
              } else {
                break;
              }
            } else {
            }

            fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${countryData[i].latitude}&longitude=${countryData[i].longitude}&hourly=temperature_2m,relativehumitidy_2m,pressure_msl,precipitation,weathercode,cloudcover,windspeed_10m,freezinglevel_height&current_weather=true`
            )
              .then(function (response) {
                return response.json();
              })
              .then(function (weatherData) {
                renderWeatherData(mainInput.value, weatherData);
                renderWeatherDetails(weatherData);
                renderBackgroundImage(weatherData.current_weather.weathercode);
              });
          } else {
          }
        }
      } else {
        for (let i = 0; i < countryData.length; i++) {
          if (countryData[i].name == capitalize(mainInput.value)) {
            countryCount++;
            if (countryCount > 1) {
              const searchCountries = prompt(
                `Seems like there are more than one ${mainInput.value} in this world, Please enter the country name.. `
              );
              const searchCountry =
                searchCountries[0].toLowerCase() + searchCountries.slice(1);
              const code = countryCode(searchCountry);

              document.querySelector(".section_right-data").textContent = "";
              document.querySelector(".section_left").innerHTML = "";
              console.log(countryData[i].country_code);
              if (countryData[i].country_code == code) {
                fetch(
                  `https://api.open-meteo.com/v1/forecast?latitude=${countryData[i].latitude}&longitude=${countryData[i].longitude}&hourly=temperature_2m,relativehumitidy_2m,pressure_msl,precipitation,weathercode,cloudcover,windspeed_10m,freezinglevel_height&current_weather=true`
                )
                  .then(function (response) {
                    return response.json();
                  })
                  .then(function (weatherData) {
                    renderWeatherData(homeInput.value, weatherData);
                    renderWeatherDetails(weatherData);
                    renderBackgroundImage(
                      weatherData.current_weather.weathercode
                    );
                  });
                break;
              } else {
                break;
              }
            } else {
            }
            fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${countryData[i].latitude}&longitude=${countryData[i].longitude}&hourly=temperature_2m,relativehumitidy_2m,pressure_msl,precipitation,weathercode,cloudcover,windspeed_10m,freezinglevel_height&current_weather=true`
            )
              .then(function (response) {
                return response.json();
              })
              .then(function (weatherData) {
                renderWeatherData(mainInput.value, weatherData);
                renderWeatherDetails(weatherData);
                renderBackgroundImage(weatherData.current_weather.weathercode);
              });
          } else {
          }
        }
      }
    });
  } catch (err) {}
})();
