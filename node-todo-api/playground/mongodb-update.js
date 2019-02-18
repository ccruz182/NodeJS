// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Something went wrong... Error:", error);
    }

    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp");

    /* Updating documents */

    db.collection("Todos")
      .findOneAndUpdate(
        {
          _id: new ObjectID("5c6ad348246c1347569afe15")
        },
        {
          $set: {
            completed: true
          }
        },
        {
          returnOriginal: false
        }
      )
      .then(result => {
        console.log("RESULT", result);
      });

    db.collection("Users")
      .findOneAndUpdate(
        { name: "Kari" },
        {
          $inc: {
            age: 1
          }
        },
        { returnOriginal: false }
      )
      .then(result => {
        console.log("RESULT", result);
      });

    client.close();
  }
);
