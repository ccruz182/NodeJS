const request = require("request");
const yargs = require("yargs");

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

const locationToFetch = encodeURI(argv.a);

const key = "dSMXOlUrVsXgaNtYx9GPgVBEusoG5jT4";
const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${locationToFetch}`;

request(
  {
    url: url,
    json: true
  },
  (error, response, body) => {
    console.log("URL", url);
    
    if (!error) {
      const { lat, lng } = body.results[0].locations[0].latLng;
      console.log("Lattitude:", lat);
      console.log("Longitude:", lng);
      return;
    }

    console.log("Something went wrong!");
  }
);
