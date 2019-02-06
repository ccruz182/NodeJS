const request = require("request");

const getForecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/83790e381f4598eed087f1a0c73992a1/${latitude},${longitude}`;
  request({ url: url, json: true }, (error, response, body) => {
    if (!error) {
      callback(null, body.currently);
    }
    callback("Something went wrong in the attempt to get the forecast");
  });
};

module.exports = {
  getForecast
}
