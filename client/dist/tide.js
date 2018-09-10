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
    console.log(currentTide)
  })

const predictionsUri =
  // 'https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=westpointwinddotcom&date=latest&datum=MLLW&station=9447130&time_zone=lst_ldt&units=english&interval=hilo&format=json'
  'https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&application=westpointwinddotcom&begin_date=20180910&end_date=20180911&datum=MLLW&station=9447130&time_zone=lst_ldt&units=english&interval=hilo&format=json'

fetch(predictionsUri, {
  mode: 'cors'
})
  .then(function(res) {
    return res.text()
  })
  .then(function(jsontxt) {
    const predictions = JSON.parse(jsontxt)
    console.log(predictions)
  })
