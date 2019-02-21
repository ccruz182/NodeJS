const express = require("express");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./db/models/todo");
const { User } = require("./db/models/user");

const app = express();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
