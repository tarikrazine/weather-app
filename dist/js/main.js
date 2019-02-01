// storage
// Weather Api

class Weather {

    constructor(lat = '32.8808789', lon = '-6.9523989', city) {

        this.apiKey     =   '0b8274ecac16484e9f9003f527449ec6';
        this.lat        =   lat;
        this.lon        =   lon;
        this.city       =   city;
    }

    async getWeather() {

        const response =  await  fetch(`https://api.weatherbit.io/v2.0/current?${!this.city ? '&lat=' + this.lat + '&lon=' + this.lon : 'city=' + this.city}&key=${this.apiKey}`);
 
        const responseData  =   await response.json();

        return responseData.data[0];

    }

    changeLocation(city) {

        this.city       =   city;
    }

}
// UI

class UI {

    constructor() {
        this.location   =   document.getElementById('location');
        this.desc   =   document.getElementById('desc');
        this.string   =   document.getElementById('string');
        this.details   =   document.getElementById('details');
        this.icon   =   document.getElementById('icon');
        this.humidity   =   document.getElementById('humidity');
        this.feelsLike   =   document.getElementById('feels-like');
        this.dewpoint   =   document.getElementById('dewpoint');
        this.wind   =   document.getElementById('wind');
        this.clouds   =   document.getElementById('clouds');
    }

    print(weather) {
        this.location.textContent   =   weather.city_name;
        this.desc.textContent       =   weather.weather.description;
        this.string.textContent     =   weather.temp + ' °';
        this.icon.setAttribute('src', 'https://www.weatherbit.io/static/img/icons/' + weather.weather.icon + '.png');
        this.humidity.textContent   =   `Relative humidity: ${weather.rh}`;
        this.feelsLike.textContent   =   `Feels like: ${weather.app_temp}`;
        this.dewpoint.textContent   =   `Dew point : ${weather.dewpt}`;
        this.wind.textContent   =   `Wind: ${weather.wind_cdir_full}`;
        this.clouds.textContent   =   `Clouds: ${weather.clouds}`;
    }

}
// Get the geolocation

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else { 
    console.log('Geolocation is not supported by this browser.');
}

function showPosition(position) {

    let lat = position.coords.latitude,
        lon = position.coords.longitude;

    console.log(lat, lon)

}

// App weather Init

const weather  =   new Weather();

// UI init

const ui       =   new UI;

//weather.changeLocation('miami');

// Get dom on DOM load

document.addEventListener('DOMContentLoaded', getWeather);

    function getWeather() {
        weather.getWeather()
            .then( data => {
                    
                ui.print(data);

                console.log(data);
            })
            .catch(err => console.log(err));
}
//# sourceMappingURL=main.js.map
