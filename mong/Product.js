var mongoose = require('mongoose');
//connect to the mlab mongodb instance on the cloud. User: ashrafkabir_2000@yahoo.com passw0rd
mongoose.connect('mongodb://admin:passw0rd@ds161475.mlab.com:61475/bn-ecomm');
var Schema = mongoose.Schema;

// create a schema
var prodSchema = new Schema({
  name: { type: String, required: true, unique: true },
  shortdesc: String, //short 20 words description of the product good for display on mobile phones.
  desc: String, //desc of the product to be printed on the website
  store_barcode: String, //assigned barcode by the store
  inventory: Number, //Qty of items remaining in the inventory
  cat: String, //category of the product
  brand: String, //brand of the product
  price: Number,
  cost: Number,
  inv_notification: Number, //notify the threshold for inventory to raise an alarm if it falls below this level.
  created_at: Date,
  updated_at: Date
});

prodSchema.methods.dudify = function() {
  // add some stuff to the users name
  this.name = this.name + '-dude';

  return this.name;
};

// the schema is useless so far
// we need to create a model using it
var Prod = mongoose.model('Prod', prodSchema);

// make this available to our users in our Node applications
module.exports = Prod;
