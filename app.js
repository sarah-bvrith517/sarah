const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

const client = new MongoClient("mongodb://127.0.0.1:27017");
let db;

client.connect().then(() => {
  db = client.db("todoDB");
  console.log("MongoDB Connected");
});

app.get("/", (req, res) => {
  res.send("Todo API working");
});