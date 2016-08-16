//Just added a comment
//added another comment
var Product = require('./Product');

// create a new user called chris
var prodvar = new Product({
  name: 'Nurpur Milk 1 Ltr carton',
  desc: 'Nurpur is a trusted name in Pakisan. They only choose the healthy Freesian cows. The milk is UHT treated and then packed into tetra pak containers. Nurpur milk cartons are specially designed to carry milk.',
  shortdesc: 'Nurpur Milk 1 Ltr carton. 12 pieces in the box',
  store_barcode: '8479283723', //assigned barcode by the store
  inventory: '323', //Qty of items remaining in the inventory
  cat: 'Dairy,Milk', //category of the product
  brand: 'Nurpur', //brand of the product
  price: 110,
  cost: 80,
  inv_notification: 382, //notify the threshold for inventory to raise an alarm if it falls below this level.
  created_at: '12 08 2015',
  updated_at: '12 08 2016',

});

// call the custom method. this will just add -dude to his name
// user will now be Chris-dude
prodvar.dudify(function(err, name) {
  if (err) throw err;

  console.log('Your new name is ' + name);
});

// call the built-in save method to save to the database
prodvar.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully!');
});
