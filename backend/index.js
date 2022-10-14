const express = require('express');
var mysql = require("mysql");
const app = express();

app.get('/', (req, res) => res.send('My first REST API!'));

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

const port = 8000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});