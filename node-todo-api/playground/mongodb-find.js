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

    /* Fetching data */
    db.collection("Users").find({name: "Cesar"}).toArray().then(docs => {
      console.log("Users");
      console.log(JSON.stringify(docs, undefined, 2));
    }).catch(error => {
      console.log("Something went wrong... Error:", error);
    });


    client.close();
  }
);
