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
router.post('/weather/add', function(req, res){
    const newCity = JSON.parse(req.query.city)
    Weather.find({cityName: newCity['cityName']}).then(result => {
        console.log(newCity['cityName'])
        if(result.length !== 0){
            res.status(409).send({"Error": "409"})
            return
        }
    })
    const weather = new Weather(newCity)
    weather.save()
            .then( () => {
                res.end()
            })
            .catch(err => res.send({'Error message': err}))
})
router.delete('/weather/delete', function(req, res){
    Weather.find({cityName: req.query.city})
    Weather.deleteOne({cityName: req.query.city}).exec()
    res.end()
})
module.exports = router