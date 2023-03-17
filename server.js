const express = require('express')
const app = express()
const api = require('./server/routes/api')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(express.static(path.join(__dirname, 'node_modules')))

const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/weatherDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((err)=> console.log(err))

app.use('/', api)

const port = 3001
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})