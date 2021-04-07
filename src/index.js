const serverless = require('serverless-http')
const express = require('express')
const got = require('got')
const parse = require('csv-parse/lib/sync')

function metersPerSecondToMph(ms) {
  return ms * 2.23694
}
const app = express()
// const tabSeparated = 'http://www.ndbc.noaa.gov/data/realtime2/WPOW1.txt'
// api.weather.gov for WPOW1 hasn't worked since 2020
// const domain = 'https://api.weather.gov/stations/WPOW1/observations'

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.get('/wpow1', async function (req, res) {
  const station = req.query.station || 'WPOW1'
  try {
    const { body } = await got(`https://sdf.ndbc.noaa.gov/sos/server.php`, {
      searchParams: {
        request: 'GetObservation',
        service: 'SOS',
        version: '1.0.0',
        offering: `urn:ioos:station:wmo:${station}`,
        observedproperty: 'winds',
        responseformat: 'text/csv',
        eventtime: 'latest'
      }
    })
    const records = parse(body, {
      columns: true
    })
    console.log(records)

    const weatherData = records[0]

    const weatherConditions = {
      stationId: weatherData.station_id,
      windSpeed: metersPerSecondToMph(
        parseInt(weatherData['wind_speed (m/s)'])
      ),
      windDirection: parseInt(weatherData['wind_from_direction (degree)']),
      windGust: metersPerSecondToMph(
        parseInt(weatherData['wind_speed_of_gust (m/s)'])
      )
    }

    res.json({
      statusCode: 200,
      weatherConditions
    })
  } catch (error) {
    res.json({
      statusCode: 500,
      body: error
    })
  }
})

module.exports.handler = serverless(app)
