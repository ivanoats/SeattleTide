const currentTideUri =
  'https://tidesandcurrents.noaa.gov/api/datagetter?station=9447130&product=water_level&datum=mllw&time_zone=lst_ldt&units=english&format=json&date=latest&application=westpointwinddotcom'
fetch(currentTideUri, {
  mode: 'cors'
})
  .then(function(res) {
    return res.text()
  })
  .then(function(jsontxt) {
    const tide = JSON.parse(jsontxt)
    const currentTide = tide.data[tide.data.length - 1]
    document.getElementById('current-tide').innerText = currentTide.v
  })

const predictionsUri =
  // 'https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=westpointwinddotcom&date=latest&datum=MLLW&station=9447130&time_zone=lst_ldt&units=english&interval=hilo&format=json'
  'https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=westpointwinddotcom&begin_date=20180910&end_date=20180911&datum=MLLW&station=9447130&time_zone=lst_ldt&units=english&interval=hilo&format=json'

const NWSDateToJSDate = nwsdate => {
  const jsdate = new Date(nwsdate)
  return `${jsdate.toLocaleDateString()} ${jsdate.toLocaleTimeString()}`
}

fetch(predictionsUri, {
  mode: 'cors'
})
  .then(function(res) {
    return res.text()
  })
  .then(function(jsontxt) {
    const predictions = JSON.parse(jsontxt)
    window.predictions = predictions.predictions
    const nextTide = `${NWSDateToJSDate(predictions.predictions[0].t)} ${
      predictions.predictions[0].v
    } ft ${predictions.predictions[0].type}`
    const nextTideAfter = `${NWSDateToJSDate(predictions.predictions[1].t)} ${
      predictions.predictions[1].v
    } ft ${predictions.predictions[1].type}`
    document.getElementById('next-tide').innerHTML = `<ul>
   <li>${nextTide} </li>
   <li>${nextTideAfter} </li>
    </ul>`
  })
