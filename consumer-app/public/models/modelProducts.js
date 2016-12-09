
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shopper');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

var productsSchema = mongoose.Schema({
    id: Number,
    name: String,
    desc: String,
    barcode: String,
    brand: String,
    price: Number,
    rating: Number,
    stock_qty: Number,
    tags: String
});
var modelProducts = db.model('product', productsSchema);

module.exports = modelProducts;
