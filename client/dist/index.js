let uri = "https://api.westpointwind.com/wpow1";
if (location.host === "localhost:8000" || location.host === "127.0.0.1:8000")
  uri = "http://localhost:3000/wpow1";
const cacheBuster = new Date().toISOString();
fetch(uri + "?" + cacheBuster, {
  mode: "cors"
})
  .then(function(res) {
    return res.text();
  })
  .then(function(jsontxt) {
    const conditions = JSON.parse(jsontxt);
    window.res = conditions;
    //process the lines of the text file
    const direction = conditions.windDirection.value;
    // speed and gust are provided in meters per second
    // multiply by 2.236936 to get miles per hour (or round up)
    const convertMetersPerSecondToMilesPerHour = 2.24;
    const speed =
      conditions.windSpeed.value * convertMetersPerSecondToMilesPerHour;
    const gust =
      conditions.windGust.value * convertMetersPerSecondToMilesPerHour;

    // temp is provided in degrees Celcius
    const convertCtoF = function convert(c) {
      return c * (9 / 5) + 32;
    };
    const temp = convertCtoF(conditions.temperature.value);
    const round = function round(x) {
      return Math.round(x * 100) / 100;
    };
    // update the html elements
    document.getElementById("direction").innerText = direction;
    document.getElementById("speed").innerText = round(speed);
    document.getElementById("gust").innerText = round(gust);
    document.getElementById("temp").innerText = round(temp);
  });
