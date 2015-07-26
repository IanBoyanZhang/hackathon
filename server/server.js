var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var session = require('express-session');
var port = process.env.PORT || 8000; 
var app = express();
var Uber = require('./lib/Uber.js');
var config = require('./config/config.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../'));

// app.use(express.cookieParser())

// Public data and method
var uber = new Uber({
  client_id: 'p9rIDKb14NHPjGlCjjejfVNlMrFOeqUP',
  client_secret: 'hCo9lupfYmKQs3YYmf_qT_rEEpDzl6NQRkQ6SmrB',
  server_token: 'bCVYp-NOq9jQaihKtVHe5FaW_Bfm-MYzUHuTuazR',
  redirect_uri: 'http://localhost:8000',
  name: 'Uber Hot Spot'
});

app.get('/api/products', function(req, res) {
  var user_loc = {
    latitude: 37.7833,
    longitude: -122.4167
  };

  console.log(uber);
  uber.products.list(user_loc, function (err, result) {
    if (err) {
      console.error(err);
    } else { 
      console.log(result);
      res.json(result);
    }
  });
});

app.get('/api/estimate', function(req, res) {
  var start_end = {
    start_latitude: 37.7833,
    start_longitude: -122.4167,
    end_latitude:  37.7875176, 
    end_longitude: -122.3998683
  };

  uber.estimates.price(start_end, 
    function (err, result) {
    if (err) {
      console.error(err);
    } else { 
      console.log(result);
      res.json(result);
    };
  });
});

app.post('/api/request', function(req, res) {
  var start_end = {
    start_latitude: 37.7833,
    start_longitude: -122.4167,
    end_latitude:  37.7875176, 
    end_longitude: -122.3998683,
    product_id: "uberX"
  };

  // res.send("Something");
  uber.requests.makeRequest(start_end,  
    function (err, result) {
      if (err) {
        console.error(err);
      } else { 
        console.log(result);
        res.json(result);
      };
    });
});

app.listen(port, function() {
  console.log('Hot Spot Server is in action');
});