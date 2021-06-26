const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
};
//selecter
const today = new Date();
const inpt = document.querySelector("input");
const btn = document.querySelector("button");
const hi_low = document.querySelector(".temp_hi_low");
const container = document.querySelector(".container");
const content = document.querySelector(".content");
let h = today.getHours();

//am pm check and bg change
function bgChnge() {
  if (h < 12) {
    container.style.backgroundImage = "url('./img/img3.jpg')";
    content.style.backgroundImage = "url('./img/img3.jpg')";
  } else {
    container.style.backgroundImage = "url('./img/img4.jpg')";
    content.style.backgroundImage = "url('./img/img4.jpg')";
  }
}

date.innerHTML = today.toLocaleDateString("en-US", options);

//apis
const api = {
  key: "2f4ac93808746dab737e0a3bf88f93a6",
  url: "https://api.openweathermap.org/data/2.5/",
};

//btn
btn.addEventListener("click", setQuery);

function setQuery() {
  getData(inpt.value);
}

function getData(query) {
  fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((wetr) => {
      return wetr.json();
    })
    .then(display);
}

function display(data) {
  if(data.cod == 404){
    cityName.innerHTML = data.message;
  }

  cityName.innerHTML = `${data.name}, ${data.sys.country}`;
  temp.innerHTML = `${Math.round(data.main.temp)}<sup>0</sup>C`;
  mast.innerHTML = data.weather[0].description;
  hi_low.innerHTML = `${Math.round(
    data.main.temp_min
  )}<sup>0</sup><span>C</span>/${Math.floor(
    data.main.temp_max
  )}<sup>0</sup><span>C</span>`;
  hum.innerHTML = `${data.main.humidity}%`;
  felk.innerHTML = `${Math.floor(
    data.main.feels_like
  )}<sup>0</sup><span>C</span>`;
  wind.innerHTML = `${data.wind.speed} km/h`;
  bgChnge();
  inpt.value = "";
}
