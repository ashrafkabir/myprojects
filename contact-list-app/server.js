var express = require("express");
var mongojs = require("mongojs");

var app = express();
var db = mongojs('contactlist', ['contactlist']);

app.use(express.static(__dirname + "/public"));
app.get('/contactlist', function(req, res) {
  console.log("I received a get request");

  db.contactlist.find(function(err, docs){
    console.log(docs);
    res.json(docs);
  });
});
/*app.get('/', function(req, res){
  res.send("Hello world from server.js");
});*/

app.listen(3000);
console.log("Server running on port 3000");
