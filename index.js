const serverless = require("serverless-http");
const express = require("express");
const requestp = require("request-promise");
const app = express();
const domain = "http://www.ndbc.noaa.gov/data/realtime2/WPOW1.txt";

// const requestWeatherInfo = function() {
// return; // a promise
// };

app.get("/wpow1", function(req, res) {
  // requestWeatherInfo.then(function() {
  //   res.send("foo");
  // });
  requestp(domain)
    .then(function(text) {
      res.send(text);
    })
    .error(function(err) {
      console.log(error);
    });
});

module.exports.handler = serverless(app);
