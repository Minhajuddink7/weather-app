const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `https://api.darksky.net/forecast/08a013dbf6db66b917d1de7ecd51ceaa/${latitude},${longitude}?units=si`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", null);
    } else {
      const { temperature, precipIntensity } = body.currently;
      const { summary } = body.daily.data[0];
      callback(null, { summary, temperature, precipIntensity });
    }
  });
};

module.exports = forecast;
