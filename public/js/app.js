const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const area = search.value;

  fetch(`http://localhost:3000/weather?city=${area}`).then(res => {
    res.json().then(data => {
      document.getElementById(
        "result"
      ).innerHTML = `In the area: ${data.area} it is: ${data.data.summary} With a current temperature of ${data.data.temperature} degree celcius and a precipitation of ${data.data.precipIntensity}!`;
    });
  });
});
