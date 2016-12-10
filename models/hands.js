var mongoose = require('mongoose');

var handSchema = new mongoose.Schema({
    cards: String
});

var Hand = mongoose.model('Hand', handSchema);

module.exports = Hand;
