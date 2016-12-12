var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var hbs = exphbs.create({
  extname: '.hbs'
});

var http = require('http').Server(app);
var io = require('socket.io')(http);
// var util = require('./util.js')

var csv = require('fast-csv')
var fs = require('fs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hands');

var db = mongoose.connection;

db.on('error', console.error.bind(console, "Error: Could not connect to MongoDB. Did you forget to run `mongod`?"))
db.once("open", function(callback){
  console.log("Connection to MongoDB succeeded.");
});

// create a schema for hand
var handSchema = new mongoose.Schema({
    cards: String,
    solution: String
});

// create model using hand schema defined above
var Hand = mongoose.model('Hand', handSchema);

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


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.set('port', (process.env.PORT || 3000));
app.use(express.static('static'));

app.get('/', function(req,res){
  res.render('game');
});

http.listen(app.get('port'));
