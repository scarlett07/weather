const locationBtn = $("#location");

//Eventos
locationBtn.click(getLocation);

//constantes
const unixDateToCurrentDate = (unixNumber) => new Date(unixNumber * 1000).toLocaleString('es-MX', { weekday: 'long' });

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCoodinates);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

const getCoodinates = position => {
  const latitude =  position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(latitude, longitude);
  getData(latitude, longitude);
}

const getData=(lat, lon)=>{
  let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/9b0da51d75d97c56a18e0e3346fe4320/${lat},${lon}?units=si`;
  fetch(url)
    .then (response => response.json()).then( json => drawWeather(json))
    .catch (function(){alert('Upps algo salio mal')})
};

const drawWeather=data=>{
  let zone = document.getElementById('zone');
  zone.innerHTML= `${data.timezone}<i class="btn material-icons right  blue lighten-3">brightness_7 cloud_circle</i>`;
  let today = document.getElementById('weather-today-container');
  let week = document.getElementById('weather-week-container');
  console.log(data);

  let template = `
          <div>${data.daily.summary}</div>
          <table class= "striped">
       <thead>
         <tr>
             <th>Temperature</th>
             <th>Humidity</th>
             <th>UV index</th>
             <th>Pressure</th>
         </tr>
       </thead>
       <tbody>
          <tr>
            <td>${data.currently.apparentTemperature}</td>
            <td>${data.currently.humidity}</td>
            <td>${data.currently.uvIndex}</td>
            <td>${data.currently.pressure}</td>
          </tr>
          </tbody>
      </table>`;
      today.innerHTML = template;

      let templateForweek = data.daily.data.forEach( day => {
          let currentDay = `<hr>
              <div>${unixDateToCurrentDate(day.time)}</div>
             <div>Icon: ${day.icon}</div>
             <div>Temperature-high: ${day.temperatureHigh} and Temperature-min: ${day.temperatureMin}</>`;
          week.insertAdjacentHTML('beforeend', currentDay);
      });



}
