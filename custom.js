const result = document.querySelector(".result");
const form = document.querySelector(".get-weather");
const nameCity = document.querySelector("#city");
const nameCountry = document.querySelector("#country");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (nameCity === "" || nameCountry === "") {
    showError("Ambos campos son obligatorios");
    return;
  }
  callApi(nameCity.value, nameCountry.value);
});

function callApi(city, country) {
  const APIid = "cc0f9d30445d5273fb9a8ca3bf0e6b23";
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIid}`;
  fetch(URL)
    .then((data) => {
      return data.json();
    })
    .then((dataJSON) => {
      if (dataJSON.cod === "404") {
        showError("Ciudad no encontrada...");
      } else {
        clearHTML();
        showWeather(dataJSON);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function showWeather(data) {
  const {
    name,
    main: { temp, temp_min, temp_max },
    weather: [arr],
  } = data;

  const degrees = kelvinToCentigrade(temp);
  const min = kelvinToCentigrade(temp_min);
  const max = kelvinToCentigrade(temp_max);

  const content = document.createElement("div");
  content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${degrees}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min: ${min}°C</p>
    `;
  result.appendChild(content);
}

function showError(message) {
  const alert = document.createElement("p");
  alert.classList.add("alert-message");
  alert.innerHTML = message;
  form.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 3000);
}

function kelvinToCentigrade(temp) {
  return parseInt(temp - 273.15);
}

function clearHTML() {
  result.innerHTML = "";
}
