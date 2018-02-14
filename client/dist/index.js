const usdomain = "https://api.weather.gov/stations/WPOW1/observations";
const domain = "https://api.westpointwind.com/wpow1";
const cacheBuster = new Date().toISOString();
fetch(domain + "?" + cacheBuster, {
  mode: "cors"
})
  .then(function(res) {
    return res.text();
  })
  .then(function(conditions) {
    //process the lines of the text file
    window.res = JSON.parse(conditions).features[0].properties;
    const currentConditions = JSON.parse(conditions).features[0].properties;
    const direction = currentConditions.windDirection.value;
    // speed and gust are provided in meters per second
    // multiply by 2.236936 to get miles per hour (or round up)
    const convertMetersPerSecondToMilesPerHour = 2.24;
    const speed =
      currentConditions.windSpeed.value * convertMetersPerSecondToMilesPerHour;
    const gust =
      currentConditions.windGust.value * convertMetersPerSecondToMilesPerHour;
    const barometer = currentConditions.barometricPressure.value; // null?
    // temp is provided in degrees Celcius
    const convertCtoF = function convert(c) {
      return c * (9 / 5) + 32;
    };
    const temp = convertCtoF(currentConditions.temperature.value);
    const round = function round(x) {
      return Math.round(x * 100) / 100;
    };
    // update the html elements
    document.getElementById("direction").innerText = direction;
    document.getElementById("speed").innerText = round(speed);
    document.getElementById("gust").innerText = round(gust);
    document.getElementById("temp").innerText = round(temp);
  });
