const serverless = require('serverless-http')
// eslint-disable-next-line no-undef
const express = __non_webpack_require__('express')
// eslint-disable-next-line no-undef
const got = __non_webpack_require__('got')
const parse = require('csv-parse/lib/sync')

function metersPerSecondToMph(ms) {
  return ms * 2.23694
}
const app = express()
// const tabSeparatedURI = 'http://www.ndbc.noaa.gov/data/realtime2/WPOW1.txt'
const uri = `https://sdf.ndbc.noaa.gov/sos/server.php`

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
    const windReq = await got(uri, {
      searchParams: {
        request: 'GetObservation',
        service: 'SOS',
        version: '1.0.0',
        offering: `urn:ioos:station:wmo:${station}`,
        observedProperty: 'winds',
        responseformat: 'text/csv',
        eventtime: 'latest'
      }
    })
    const windBody = windReq.body
    const records = parse(windBody, {
      columns: true
    })
    const weatherData = records[0]
    observations.stationId = weatherData.station_id
    observations.windSpeed = metersPerSecondToMph(
      parseInt(weatherData['wind_speed (m/s)'])
    )
    observations.windDirection = parseInt(
      weatherData['wind_from_direction (degree)']
    )
    observations.windGust = metersPerSecondToMph(
      parseInt(weatherData['wind_speed_of_gust (m/s)'])
    )
  } catch (error) {
    errors.push(error)
  }
  try {
    const tempResults = await got(uri, {
      searchParams: {
        request: 'GetObservation',
        service: 'SOS',
        version: '1.0.0',
        offering: `urn:ioos:station:wmo:${station}`,
        observedProperty: 'air_temperature',
        responseformat: 'text/csv',
        eventtime: 'latest'
      }
    })
    const tempData = parse(tempResults.body, {
      columns: true
    })[0]
    observations.airTemp = parseInt(tempData['air_temperature (C)'])
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
      body: errors
    })
  }
})

module.exports.handler = serverless(app)
