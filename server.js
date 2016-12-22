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
mongoose.connect('mongodb://sally:' + process.env.MLAB_DB_PASSWORD + '@ds141358.mlab.com:41358/' + process.env.MLAB_DB_NAME);

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

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'mlab connection error:'));
db.once('open', function(){
  console.log('connected to mlab database for valid hands');
});

app.listen(3000, function(){
  console.log('listening on 3000');
});

app.get('/', function(req, res){
  // var randomHand = db.collection('hands').aggregate(
  //   [ { $sample: {size: 1} } ]
  // );
  // console.log(randomHand);
  var randomHand

  Hand.count().exec(function(err, count){
    var randomIndex = Math.floor(Math.random() * count);

    Hand.findOne().skip(randomIndex).exec(
      function(err, result){
        randomHand = result;
      }
    )
  })

  console.log(randomHand);
})
