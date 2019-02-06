const request = require("request");
const axios = require("axios");

const getForecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/83790e381f4598eed087f1a0c73992a1/${latitude},${longitude}`;
  request({ url: url, json: true }, (error, response, body) => {
    if (!error) {
      callback(null, body.currently);
    }
    callback("Something went wrong in the attempt to get the forecast");
  });
};

const getForecast_Promise = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.darksky.net/forecast/83790e381f4598eed087f1a0c73992a1/${latitude},${longitude}`;

    request({ url: url, json: true }, (error, response, body) => {
      if (!error) {
        resolve(body.currently);
      }
      reject("Something went wrong in the attempt to get the forecast");
    });
  });
};

const getForecast_axios = (latitude, longitude) => {
  const url = `https://api.darksky.net/forecast/83790e381f4598eed087f1a0c73992a1/${latitude},${longitude}`;

  return axios.get(url).then(response => {
    const { summary, temperature, apparentTemperature } = response.data.currently;
    return {summary, temperature, apparentTemperature}
  });
}

module.exports = {
  getForecast,
  getForecast_Promise,
  getForecast_axios
};
