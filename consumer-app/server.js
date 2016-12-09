var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var modelProducts = require("./public/models/modelProducts")

var app = express();
var db = mongojs('shopper', ['products']);

app.use(express.static(__dirname +"/public"));
app.use(bodyParser.json());

app.get('/productlist', function(req, res) {
  console.log("I received a get request");



  /*db.products.find(function(err, docs){
    console.log(docs);
    res.json(docs);
  });*/
  var query = modelProducts.find({});

query.exec(function (err, docs) {
  // called when the `query.complete` or `query.error` are called
  // internally
  console.log("Inside find: "+docs);
  res.json(docs);
});

});

var db2 = mongojs('shopper', ['categories']);
app.get('/categorylist', function(req, res) {
  console.log("I received a category request");

  db2.categories.find(function(err, docs){
    console.log(docs);
    res.json(docs);
  });
});

app.post('/productlist', function (req, res) {
  console.log(req.body);
  db.contactlist.insert(req.body, function (err, doc) {
    res.json(doc);
  });
});

app.get('/catprods/:id', function (req, res) {
  var catid = req.params.id;
  var prods = "";
  var db3 = mongojs('shopper', ['product_category']);
  console.log("Finding in product_category the category: "+catid);
  db3.product_category.find({cat_id:parseInt(catid)}, function (err, doc) {
    console.log("Found products: "+doc);
    if( err || !doc) console.log("No products found for catid: " + catid);
      else doc.forEach( function(prodcat) {
        var db4 = mongojs('shopper', ['products']);
        db4.products.find({id:prodcat.prod_id}, function (err2,doc2){
          var stringified="";
          stringified=JSON.stringify(doc2).replace('[','').replace('{','').replace('}','').replace(']','');
          console.log("pushing->"+stringified);


          prods+="{"+stringified+"}";
console.log("Inside: /n"+prods);

        });

      } );
      console.log("Outside: "+prods);
      res.json(prods);
  });
  //prods+="]";

});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function(req, res) {
  var id = req.params.id;
  console.log("Find one id: " + id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:id', function(req, res){
  var id = req.params.id;
  console.log("Update / Put name: " + req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true
    },
    function(err, doc) {
      res.json(doc);
    });
});

/*app.get('/', function(req, res){
  res.send("Hello world from server.js");
});*/

app.listen(3000);
console.log("Server running on port 3000");
