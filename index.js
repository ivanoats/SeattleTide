const serverless = require('serverless-http')
const express = require('express')
const requestp = require('request-promise')
const app = express()
// const tabSeparated = 'http://www.ndbc.noaa.gov/data/realtime2/WPOW1.txt'
const domain = 'https://api.weather.gov/stations/WPOW1/observations'

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.get('/wpow1', function (req, res) {
  requestp({
    uri: domain,
    headers: {
      'User-Agent': 'seattletide',
      Accept: 'application/geo+json'
    },
    json: true
  })
    .then(function (text) {
      res.json(text.features[0].properties)
      console.log(text.features[0].properties)
    })
    .catch(function (err) {
      console.log(err)
    })
})

module.exports.handler = serverless(app)
