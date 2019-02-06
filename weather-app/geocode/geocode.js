const request = require("request");
const axios = require("axios");

const forecast = require("../forecast/forecast");

const key = "dSMXOlUrVsXgaNtYx9GPgVBEusoG5jT4";

const geocodeAddress = (locationToGeocode, callback) => {
  const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${locationToGeocode}`;

  request(
    {
      url: url,
      json: true
    },
    (error, response, body) => {
      if (!error) {
        const { lat, lng } = body.results[0].locations[0].latLng;
        callback(null, { latitude: lat, longitude: lng });
      }

      callback("Something went wrong");
    }
  );
};

const geocodeAddress_Promise = locationToGeocode => {
  const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${locationToGeocode}`;

  return new Promise((resolve, reject) => {
    request(
      {
        url: url,
        json: true
      },
      (error, response, body) => {
        if (!error) {
          const { lat, lng } = body.results[0].locations[0].latLng;
          resolve({ latitude: lat, longitude: lng });
        }

        reject("Something went wrong");
      }
    );
  });
};

const geocodeAddress_axios = locationToGeocode => {
  const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${locationToGeocode}`;

  return axios
    .get(url)
    .then(response => {
      const { lat, lng } = response.data.results[0].locations[0].latLng;
      return { latitude: lat, longitude: lng };
    })
    .then(data => forecast.getForecast_axios(data.latitude, data.longitude));  
};

module.exports = {
  geocodeAddress,
  geocodeAddress_Promise,
  geocodeAddress_axios
};
