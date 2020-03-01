// require express, path, and file system
const express = require("express");
const path = require("path");
const fs = require("fs");

//declare app as express
const app = express();

app.use(express.static("public"));
app.use(express.json());

//set up my main page at /
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

//set up my ingredients page at /ingredients
app.get("/ingredients", (req,res) => {
    res.sendFile(path.join(__dirname, "/ingredients.html"));
});

//open the server on port 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000!");
})