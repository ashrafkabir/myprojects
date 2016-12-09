var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shopper');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("===== Model Categories, Connected to MongoDB");
});

var categoriesSchema = mongoose.Schema({
    id: Number,
    name: String,
    desc: String,
});
var modelCategories = db.model('category', categoriesSchema, 'categories');

module.exports = modelCategories;
