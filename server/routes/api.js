const URL = {
    apiKey: '32140e6577fd0f3a4b0cbbcff1ed4dd1',
    weatherURL: "https://api.openweathermap.org/data/2.5/weather"

}
const Weather = require('../models/Weather')
const express = require("express");
const router = express.Router();
const axios = require('axios')

router.get('/weather/api', function(req, res){
    const city = req.query.city
    return axios.get (URL.weatherURL, {
        params: {
            q: city,
            appid : URL.apiKey,
            units: 'metric'
        }
    })
    .then(response => {
        res.send(response.data)
    })
    .catch((err) => res.send(err))
})
router.get('/weather', function(req, res){

    Weather.find({cityName: req.query.city})
            .then(cityData => {
                res.send(cityData)
            })
            .catch(err => res.send({'Error message': err}))

})
router.post('weather/add', function(req, res){
    const newCity = req.query.city
    const weather = new Weather({
        cityName: newCity.cityName,
        temperature: newCity.temperature,
        condition: newCity.condition,
        conditionPic: newCity.conditionPic

    })
    weather.save()
            .then(() => res.end())
})
router.delete('/weather/delete', function(req, res){
    Weather.find({cityName: req.query.city}).remove()
})
module.exports = router