/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("let uri = 'https://api.westpointwind.com/wpow1'\nif (location.host === 'localhost:3001' || location.host === '127.0.0.1:3001')\n  uri = 'http://localhost:3000/dev/wpow1'\nconst cacheBuster = new Date().toISOString()\nconst round = function round(x) {\n  if (isNaN(x)) return x\n  return Math.round(x * 100) / 100\n}\n\nfetch(uri + '?' + cacheBuster, {\n  mode: 'cors'\n})\n  .then(function (res) {\n    return res.text()\n  })\n  .then(function (jsontxt) {\n    const conditions = JSON.parse(jsontxt).observations\n\n    // DEBUG info\n    // @ts-ignore\n    window.res = conditions\n\n    // Process the lines of the text file\n    const direction = conditions.windDirection || 'Not Available'\n    const directionWithArrow = `${direction}º <span style=\"display: inline-block; margin-left: 5px; transform: rotate(${direction}deg);\">↓</span>`\n\n    // Wind Speed\n    let speed, gust\n    if (conditions.windSpeed == null) {\n      console.log('wind speed not available')\n      speed = 'Not Available'\n    } else {\n      speed = round(conditions.windSpeed)\n    }\n    if (conditions.windGust == null) {\n      gust = 'Not Available'\n    } else {\n      gust = round(conditions.windGust)\n    }\n\n    // Temperature is provided in degrees Celcius\n    const convertCtoF = function convert(c) {\n      return c * (9 / 5) + 32\n    }\n    let temp\n    if (conditions.airTemp == null) {\n      temp = 'Not Available'\n    } else {\n      temp = round(convertCtoF(conditions.airTemp))\n    }\n\n    // Pressure\n    let pressure\n    if (conditions.seaLevelPressure == null) {\n      pressure = 'Not Available'\n    } else {\n      pressure = round(conditions.seaLevelPressure / 100)\n    }\n\n    let currentTide\n    if (conditions.currentTide == null) {\n      currentTide = 'Not Available'\n    } else {\n      currentTide = conditions.currentTide\n    }\n\n    // Update the html elements\n    document.getElementById('direction').innerHTML = directionWithArrow\n    document.getElementById('speed').innerText = speed\n    document.getElementById('gust').innerText = gust\n    document.getElementById('temp').innerText = temp\n    document.getElementById('pressure').innerText = pressure\n    document.getElementById('current-tide').innerText = currentTide\n  })\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;