var mongoose = require('mongoose');

// create a schema for hand
var handSchema = new mongoose.Schema({
    cards: String
});

// create model using hand schema defined above
var Hand = mongoose.model('Hand', handSchema);

// make this available to our users in our Node applications
module.exports = Hand;
