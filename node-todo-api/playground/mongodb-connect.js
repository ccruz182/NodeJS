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

    /* Inserting data */

    // db.collection("Todos").insertOne({
    //   text: "Something to do", completed: false
    // }, (error, result) => {
    //   if (error) {
    //     return console.log("Something went wrong... Error:", error);
    //   }

    //   console.log("Insertion OK.", JSON.stringify(result.ops, undefined, 2));
    // } );

    db.collection("Users").insertOne(
      {
        name: "Cesar",
        age: 21,
        location: "MX"
      },
      (error, result) => {
        if (error) {
          return console.log("Something went wrong... Error:", error);
        }

        console.log("Insertion OK.", JSON.stringify(result.ops, undefined, 2));
      }
    );

    client.close();
  }
);
