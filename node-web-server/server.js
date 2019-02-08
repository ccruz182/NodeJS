const express = require("express");
const app = express();

/* Behave in a different way -> middleware */
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  const now = new Date().toString();
  console.log(`Request @ ${now}`, req.method, req.url);
  next();
});

app.use((req, res, next) => {
  // res.send("<h1>Under maintenance</h1>");
  setTimeout(() => {
    next();
  }, 5000);
})

app.get("/", (request, response) => {
  // response.send("<h1>Hello Express!! x<sub>1</sub></h1>");
  response.send({
    name: "Cesar", grade: 9.68
  });
});

app.get("/bad", (req, res) => {
  res.send("<p style='color:red'><b>Something went wrong</b></p>")
});

app.listen(3000, () => {
  console.log("Server is up in port 3000"); 
});