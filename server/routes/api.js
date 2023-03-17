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
        let ans = [lat, lon]
        return ans

    }).catch((err) => {
        res.send({"messege error:" : err})
    })
    .then(coordinates => {
        return axios.get(WEATHER.weatherURL, {
            params: {
                lat: coordinates[0],
                lon: coordinates[1],
                appid: WEATHER.apiKey,
                units: 'metric'
            }
        })
    }).catch((err) => res.send(err))
    .then(response => {
        console.log('hi')
        res.send(response.data)})
    .catch((err) => res.send(err))
})
module.exports = router