const request = require("request");
const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/ 
    ${encodeURIComponent(address)}
    .json?access_token=pk.eyJ1IjoibWluaGFqdWRkaW5rNyIsImEiOiJjazZmNDRkdm4yNGZ3M25xajViejZ6ZHhtIn0.QezHklx2ahibW_l6nUumzA`;
  request({ url, json: true }, (error, { body: { features } }) => {
    if (error) {
      callback("Unable to connect to location services!", null);
    } else if (features.length === 0) {
      callback("Unable to find location. Try another search!", null);
    } else {
      callback(null, {
        longitude: features[0].center[0],
        latitude: features[0].center[1],
        location: features[0].place_name
      });
    }
  });
};
module.exports = geoCode;
