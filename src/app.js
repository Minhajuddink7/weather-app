const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));
app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Minhaj" });
});
app.get("/help", (req, res) => {
  res.render("help", { title: "Help page", name: "Minhaj" });
});

app.get("/weather", (req, res) => {
  if (!req.query.city) {
    return res.send({ message: "Please provide the city name" });
  }
  geoCode(req.query.city, (error, data) => {
    if (error) {
      return console.log(error);
    } else {
      forecast(data.longitude, data.latitude, (error, forecastData) => {
        if (error) {
          return console.log(error);
        }
        res.send({
          area: data.location,
          data: forecastData,
        });
      });
    }
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Not Found!",
    errorMsg: "The page you requested was not found",
    name: "Minhaj",
  });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
