const serverless = require('serverless-http')
const express = require('express')
const got = require('got')
const parse = require('csv-parse/lib/sync')
const { resetErrorsCount } = require('ajv/dist/compile/errors')

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
  const errors = []
  const observations = {}
  const station = req.query.station || 'WPOW1'
  try {
    const windBody = await got(`https://sdf.ndbc.noaa.gov/sos/server.php`, {
      searchParams: {
        request: 'GetObservation',
        service: 'SOS',
        version: '1.0.0',
        offering: `urn:ioos:station:wmo:${station}`,
        observedproperty: 'winds',
        responseformat: 'text/csv',
        eventtime: 'latest'
      }
    }).body
    const records = parse(windBody, {
      columns: true
    })
    console.log(records)
    const weatherData = records[0]
    const windConditions = {
      stationId: weatherData.station_id,
      windSpeed: metersPerSecondToMph(
        parseInt(weatherData['wind_speed (m/s)'])
      ),
      windDirection: parseInt(weatherData['wind_from_direction (degree)']),
      windGust: metersPerSecondToMph(
        parseInt(weatherData['wind_speed_of_gust (m/s)'])
      )
    }
    observations.windConditions = windConditions
  } catch (error) {
    errors.push(error)
  }
  try {
    const tempBody = await got(`https://sdf.nbdc.noaa.gov/sos/server.php`, {
      searchParams: {
        request: 'GetObservation',
        service: 'SOS',
        version: '1.0.0',
        offering: `urn:ioos:station:wmo:${station}`,
        observedproperty: 'temperature',
        responseformat: 'text/csv',
        eventtime: 'latest'
      }
    }).body
    console.log(tempBody)
  } catch (error) {
    errors.push(error)
  }

  if (errors.length < 1) {
    res.json({
      statusCode: 200,
      observations
    })
  } else {
    res.json({
      statusCode: 500,
      body: error
    })
  }
})

module.exports.handler = serverless(app)
