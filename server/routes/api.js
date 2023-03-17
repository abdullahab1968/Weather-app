const WEATHER = {
    geocodeURL : "http://api.openweathermap.org/geo/1.0/direct",
    apiKey: '32140e6577fd0f3a4b0cbbcff1ed4dd1',
    weatherURL: "https://api.openweathermap.org/data/2.5/weather"

}
const express = require("express");
const router = express.Router();
const axios = require('axios')

router.get('/weather', function(req, res){
    const city = req.query.city
    axios.get (WEATHER.geocodeURL, {
        params: {
            q: city,
            limit: 1,
            appid : WEATHER.apiKey
        }
    }).then(response => {
        const lat = response.data[0].lat
        const lon = response.data[0].lon
        return [lat, lon]

    }).catch((err) => console.log(err))
    .then(coordinates => {
        axios.get(WEATHER.weatherURL, {
            params: {
                lat: coordinates[0],
                lon: coordinates[1],
                appid: WEATHER.apiKey
            }
        })
    }).catch((err) => console.log(err))
    .then(weatherData => res.send(weatherData))
    .catch((err) => console.log(err))
})
module.exports = router