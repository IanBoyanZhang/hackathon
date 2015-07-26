var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var port = process.env.PORT || 8000; 
var app = express();
var Uber = require('./lib/Uber.js');
var config = require('./config/config.js');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '../'));


app.listen(port, function() {
  console.log('Hot Spot Server is in action');
});