import { leadingZero } from './util/leaingZero'
import { NWSDateToJSDate } from './util/nws-date-to-js-date'

const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const tomorrowDay = tomorrow.getDate()
const tomorrowMonth = tomorrow.getMonth() + 1
const formattedTomorrowMonth = leadingZero(tomorrowMonth)
const formattedTomorrowDay = leadingZero(tomorrowDay)

const year = today.getFullYear()
const day = today.getDate()
const formattedDay = leadingZero(day)

const month = today.getMonth() + 1
const formattedMonth = leadingZero(month)
const beginDate = `${year}${formattedMonth}${formattedDay}`
const endDate = `${year}${formattedTomorrowMonth}${formattedTomorrowDay}`

const predictionsUri = `https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=westpointwinddotcom&begin_date=${beginDate}&end_date=${endDate}&datum=MLLW&station=9447130&time_zone=lst_ldt&units=english&interval=hilo&format=json`

fetch(predictionsUri, {
  mode: 'cors'
})
  .then(function (res) {
    return res.text()
  })
  .then(function (jsontxt) {
    const predictions = JSON.parse(jsontxt)
    if (predictions.error) {
      document.getElementById(
        'next-tide'
      ).innerText = `Error retreiving tide prediction`
      return
    }
    const nextTide = `${NWSDateToJSDate(predictions.predictions[0].t)} ${
      predictions.predictions[0].v
    } ft ${predictions.predictions[0].type}`
    let nextTideAfter
    if (predictions.predictions.length > 1) {
      nextTideAfter = `${NWSDateToJSDate(predictions.predictions[1].t)} ${
        predictions.predictions[1].v
      } ft ${predictions.predictions[1].type}`
    } else {
      nextTideAfter = 'Unavailable'
    }
    document.getElementById('next-tide').innerHTML = `<ul>
      <li>${nextTide} </li>
      <li>${nextTideAfter} </li>
    </ul>`
  })
