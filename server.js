var mongoose = require('mongoose');

var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var hbs = exphbs.create({
  extname: '.hbs'
});

var http = require('http').Server(app);
var io = require('socket.io')(http);
// var util = require('./util.js')

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.set('port', (process.env.PORT || 3000));
app.use(express.static('static'));

app.get('/', function(req,res){
  res.render('game');
});

http.listen(app.get('port'));
