// Express import
var express = require('express');
var app = express();

// Handlebars for express
var exphbs = require('express-handlebars');

// Use Handlebars are default Express template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Tell Node to serve resouces in static
app.use(express.static('static'));

// Require and configure dotenv to load environment variables
require('dotenv').config();

// Mongoose import
var mongoose = require('mongoose');

// Mongoose connection to MongoDB
db = mongoose.connect('mongodb://sally:' + process.env.MLAB_DB_PASSWORD + ":41358/" + process.env.MLAB_DB_NAME, function(err){
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

var db = mongoose.connection;

db.on('error', console.error.bind(console, "Error: Could not connect to MongoDB. Did you forget to run `mongod`?"))
db.once("open", function(callback){
  console.log("Connection to MongoDB succeeded.");
});


// make this available to our users in our Node applications
module.exports = Hand;

var stream = fs.createReadStream('static/etc/hands.csv')

csv.fromStream(stream, {headers:true})
  .on('data', function(data){
    addHand(data);
  })
  .on('end', function(){
    "done importing"
  });

function addHand(data){
  console.log(data);
  var hand = new Hand(data);
  console.log(hand);
  hand.save(function(error){
    if (error){
      console.log(error);
    };
  });
};
