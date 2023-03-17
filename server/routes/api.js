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
    return axios.get (WEATHER.weatherURL, {
        params: {
            q: city,
            appid : WEATHER.apiKey,
            units: 'metric'

        }
    })
    .then(response => {
        res.send(response.data)
    })
    .catch((err) => res.send(err))
})
module.exports = router