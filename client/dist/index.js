let uri = 'https://api.westpointwind.com/wpow1'
if (location.host === 'localhost:3001' || location.host === '127.0.0.1:3001')
  uri = 'http://localhost:3000/wpow1'
const cacheBuster = new Date().toISOString()
const round = function round(x) {
  if (isNaN(x)) return x
  return Math.round(x * 100) / 100
}

fetch(uri + '?' + cacheBuster, {
  mode: 'cors'
})
  .then(function(res) {
    return res.text()
  })
  .then(function(jsontxt) {
    const conditions = JSON.parse(jsontxt)

    // DEBUG info
    window.res = conditions

    // Process the lines of the text file
    const direction = conditions.windDirection.value || 'Not Available'
    const directionWithArrow = `${direction}º <span style="display: inline-block; margin-left: 5px; transform: rotate(${direction}deg);">↓</span>`

    // Wind Speed
    // speed and gust are provided in meters per second
    // multiply by 2.236936 to get miles per hour (or round up)
    const convertMetersPerSecondToMilesPerHour = 2.24
    let speed, gust
    if (conditions.windSpeed.value == null) {
      console.log('wind speed not available')
      speed = 'Not Available'
    } else {
      speed = round(
        conditions.windSpeed.value * convertMetersPerSecondToMilesPerHour
      )
    }
    if (conditions.windGust.value == null) {
      gust = 'Not Available'
    } else {
      gust = round(
        conditions.windGust.value * convertMetersPerSecondToMilesPerHour
      )
    }

    // Temperature is provided in degrees Celcius
    const convertCtoF = function convert(c) {
      return c * (9 / 5) + 32
    }
    let temp
    if (conditions.temperature.value == null) {
      temp = 'Not Available'
    } else {
      temp = round(convertCtoF(conditions.temperature.value))
    }

    // Update the html elements
    document.getElementById('direction').innerHTML = directionWithArrow
    document.getElementById('speed').innerText = speed
    document.getElementById('gust').innerText = gust
    document.getElementById('temp').innerText = temp
  })
