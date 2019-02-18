// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb")

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Something went wrong... Error:", error);
    }

    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp");

    /* Deleting documents */

    // Delete Many
    db.collection("Todos").deleteMany({text: "Something to do"}).then(result => {
      console.log("Result:", result);
    });

    // Delete One
    db.collection("Todos").deleteOne({text: "Eat"}).then(result => {
      console.log("Result:", result);
    });

    // FindOne and Delete
    db.collection("Todos").findOneAndDelete({text: "Walk the dog"}).then();

    client.close();
  }
);
