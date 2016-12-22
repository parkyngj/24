require('dotenv').config();

var mongoose = require('mongoose');

// Mongoose connection to MongoDB
db = mongoose.connect('mongodb://sally:' + process.env.MLAB_DB_PASSWORD + '@ds141358.mlab.com:41358/' + process.env.MLAB_DB_NAME, function(err){
  if(err){
    console.log(err);
  }
});

// Mongoose Schema definition
var Schema = mongoose.Schema;
var handSchema = new Schema({
  cards: {
  type: String,
  unique: true,
  index: true
  },
  solution: String
});

// Mongoose Model definition
var Hand = mongoose.model('hands', handSchema);

var csv = require('fast-csv')
var fs = require('fs');

var stream = fs.createReadStream('static/etc/hands.csv')

csv.fromStream(stream, {headers:true})
  .on('data', function(data){
    addHand(data);
  })
  .on('end', function(){
    "done importing"
  });

function addHand(data){
  // console.log(data);
  var hand = new Hand(data);
  // console.log(hand);
  hand.save(function(error){
    if (error){
      console.log(error);
    };
  });
};
