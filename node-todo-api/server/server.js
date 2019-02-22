const express = require("express");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./db/models/todo");
const { User } = require("./db/models/user");

const app = express();

app.use(bodyParser.json());

app.post("/todo", (req, res) => {
  const newTodo = new Todo({ text: req.body.text });

  newTodo.save().then(doc => {
    res.send(doc);
  }).catch(error => {
    console.log("here");
    res.status(400).send(error);
  });
});

app.get("/todos", (req, res) => {
  Todo.find({}).then(todos => {
    res.send({todos})
  });
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = {
  app
}
