const api = 'f16d1f3b1cffdb6e7502e9de858b2e9d'; 
const imgIcon = document.getElementById("weather-icon"); //pulling html into this js file, so we can manipulate it from here
const loc = document.querySelector("#location"); //all of this are just variables to represent classes in html
const tempC = document.querySelector(".c");
const tempF = document.querySelector(".f");
const desc = document.querySelector(".descrip");
const sunriseDOM = document.querySelector(".sunrise");
const sunsetDOM = document.querySelector(".sunset");

//wait for page contents to load before loading JS  
window.addEventListener('load', () => {
    let long;
    let lat;
    // Accesing Geolocation of User
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
        // Storing Longitude and Latitude in variables
        console.log(position);
        long = position.coords.longitude;
        lat  = position.coords.latitude;
      
        const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
        console.log(base);
       
        fetch(base)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                const {temp} = data.main;
                const place = data.name;
                const {description, icon} = data.weather[0];
                const {sunrise,sunset} = data.sys; 
                
                //use this url in html img tag, url will change based on what icon value is 
                const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                
                const fahrenheit = (temp * 9) / 5 + 32; //given both celsius and farenheit 
                const sunriseGMT = new Date(sunrise * 1000);
                const sunsetGMT = new Date(sunset * 1000);

                imgIcon.src = iconURL; 
                loc.textContent = `${place}`; 
                desc.textContent = `${description}`;
                tempC.textContent = `${temp.toFixed(2)} °C`; 
                tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
                sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
                sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
            });
    });
  }
  
});