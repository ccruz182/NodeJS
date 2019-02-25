const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./db/models/todo");
const { User } = require("./db/models/user");

const app = express();

app.use(bodyParser.json());

app.post("/todo", (req, res) => {
  const newTodo = new Todo({ text: req.body.text });

  newTodo
    .save()
    .then(doc => {
      res.send(doc);
    })
    .catch(error => {
      console.log("here");
      res.status(400).send(error);
    });
});

app.get("/todos", (req, res) => {
  Todo.find({})
    .then(todos => {
      res.send({ todos });
    })
    .catch(error => {
      res.status(401).send(error);
    });
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(401).send({ error: "Bad request" });
  } else {
    Todo.findOne({ _id: id }).then(todo => {
      if (todo) return res.status(200).send(todo);
      else return res.status(404).send({ error: "Item not found" });
    });
  }
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(401).send({ error: "Bad request" });
  } else {
    Todo.findOneAndDelete({ _id: id }).then(todo => {
      if (todo) return res.status(200).send({ message: "Item deleted" });
      else return res.status(404).send({ error: "Item not found" });
    });
  }
});

app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { completed, completedAt } = req.body;

  if (ObjectID.isValid(id)) {
    if (completed && completedAt) {      
      Todo.findOneAndUpdate(
        { _id: id },
        { $set: { completed: completed, completedAt: completedAt } }
      )
        .then(doc => {
          if (doc) return res.send({ message: "Item updated" });
          else return res.status(404).send({error: "Item not found"});
        })
        .catch(error => {
          return res.status(401).send({ error });
        });
    } else {
      return res.status(401).send({ error: "Bad request" });
    }
  } else {
    return res.status(401).send({ error: "Bad request" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports = {
  app
};
