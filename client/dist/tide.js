const leadingZero = (num) => {
  return `${num}`.length === 1 ? `0` + num : num
}

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

const NWSDateToJSDate = (nwsdate) => {
  let jsdate
  if (isNaN(Date.parse(nwsdate))) {
    return nwsdate
  } else {
    jsdate = new Date(nwsdate)
    const formattedDate = `${jsdate.toLocaleDateString()} ${jsdate.toLocaleTimeString()}`
    return formattedDate
  }
}

fetch(predictionsUri, {
  mode: 'no-cors'
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
