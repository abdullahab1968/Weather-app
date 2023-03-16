const mongoose = require('mongoose')
const Schema = mongoose.Schema
const weatherSchema = new Schema({
    name:String,
    temperature: Number,
    condition: String,
    conditionPic: String
})

const Weather = mongoose.model("Weather", weatherSchema)
module.exports = Weather