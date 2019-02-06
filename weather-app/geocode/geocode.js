const request = require("request");

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

module.exports = {
  geocodeAddress
};
