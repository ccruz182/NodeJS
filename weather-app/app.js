const yargs = require("yargs");
const geocode = require("./geocode/geocode");
const forecast = require("./forecast/forecast");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

const locationToGeocode = encodeURI(argv.a);
console.log("Location to geocode", locationToGeocode);

/* Using just callbacks */
// geocode.geocodeAddress(locationToGeocode, (errorMessage, response) => {
//   if (!errorMessage) {
//     forecast.getForecast(response.latitude, response.longitude, (errorMessage, forecast) => {
//       if (!errorMessage) {
//         const {summary, temperature, apparentTemperature} = forecast;
//         console.log("Summary:\t", summary, "\nTemperature:\t", temperature, "°F");
//         console.log("RealSense:\t", apparentTemperature, "°F");
//       }
//     });
//   }
// });

/* Using Promises */
// geocode
//   .geocodeAddress_Promise(locationToGeocode)
//   .then(locationData => {
//     forecast
//       .getForecast_Promise(locationData.latitude, locationData.longitude)
//       .then(forecast => {
//         const { summary, temperature, apparentTemperature } = forecast;
//         console.log(
//           "Summary:\t",
//           summary,
//           "\nTemperature:\t",
//           temperature,
//           "°F"
//         );
//         console.log("RealSense:\t", apparentTemperature, "°F");
//       })
//       .catch(error => {
//         console.log("ERROR", error);
//       });
//   })
//   .catch(error => {
//     console.log("ERROR", error);
//   });

/* Using axios */
geocode.geocodeAddress_axios(locationToGeocode).then(forecast => {
  const { summary, temperature, apparentTemperature } = forecast;

  console.log("Summary:\t", summary, "\nTemperature:\t", temperature, "°F");
  console.log("RealSense:\t", apparentTemperature, "°F");
});
