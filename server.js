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

var Hand = require('./models/hand');

var stream = fs.createReadStream('/static/etc/hands.csv')

csv.fromStream(stream, {headers:true})
  .on('data', function(data){
    add
  })

function addHand(data){
  var hand = new Hand(data);
}


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.set('port', (process.env.PORT || 3000));
app.use(express.static('static'));

app.get('/', function(req,res){
  res.render('game');
});

http.listen(app.get('port'));
