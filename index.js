const serverless = require("serverless-http");
const express = require("express");
const requestp = require("request-promise");
const app = express();
const tabSeparated = "http://www.ndbc.noaa.gov/data/realtime2/WPOW1.txt";
const domain = "https://api.weather.gov/stations/WPOW1/observations";

// const requestWeatherInfo = function() {
// return; // a promise
// };

app.get("/wpow1", function(req, res) {
  requestp({
    uri: domain,
    headers: {
      "User-Agent": "seattletide",
      Accept: "application/geo+json"
    },
    json: true
  })
    .then(function(text) {
      res.json(text);
    })
    .catch(function(err) {
      console.log(error);
    });
});

module.exports.handler = serverless(app);
