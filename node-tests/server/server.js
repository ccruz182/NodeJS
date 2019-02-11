const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send({ name: "My app", date: "2019-02-11" });
});

app.get("/users", (req, res) => {
  const users = [
    { name: "Cesar", age: 21 },
    { name: "Lolis", age: 55 },
    { name: "Kari", age: 0 }
  ];

  res.send(users);
});
app.listen(1234);

module.exports.app = app;
