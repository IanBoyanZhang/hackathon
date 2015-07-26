var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var session = require('express-session');
var port = 8000; 
var app = express();
var Uber = require('./lib/Uber.js');
var config = require('./config/config.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../'));

// app.use(express.cookieParser())
var MESSAGE_QUEUE = [];
// Public data and method
var uber = new Uber({
  client_id: 'p9rIDKb14NHPjGlCjjejfVNlMrFOeqUP',
  client_secret: 'hCo9lupfYmKQs3YYmf_qT_rEEpDzl6NQRkQ6SmrB',
  server_token: 'bCVYp-NOq9jQaihKtVHe5FaW_Bfm-MYzUHuTuazR',
  redirect_uri: 'http://localhost:8000',
  name: 'Uber Hot Spot'
});

var poi = [
{
  "start_latitude": "37.7875774",
  "start_longitude": "-122.4002364",
  "end_latitude": "37.771495",
  "end_longitude": "-122.4314003",
  "product_id" : "uberX"
},
{
  "start_latitude": "37.7875774",
  "start_longitude": "-122.4002364",
  "end_latitude": "37.7881016",
  "end_longitude": "-122.4203775",
  "product_id" : "uberX"
},
{

}
]

var VEHICLES = {
  'uberX':'a1111c8c-c720-46c3-8534-2fcdd730040d',
  'uberXL': '821415d8-3bd5-4e27-9604-194e4359a449',
  'uberBLACK':'d4abaae7-f4d6-4152-91cc-77523e8165a4',
  'uberSUV': "8920cb5e-51a4-4fa4-acdf-dd86c5e18ae0",
  'uberTAXI': '3ab64887-4842-4c8e-9780-ccecd3a0391d'
}

var ACCESS_TOKEN = "LOKFVYIXAKejCd2zsRzxmBz95w4exX";

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

app.post('/api/estimate', function(req, res) {
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
  var start_end = poi[Number(req.body.id) - 1];
  console.log("body", req.body);
  console.log(start_end);
  var cb = function(err, result, body) {
    // your code here
    if (err) {
      console.error(err);
    } else { 
      console.log(body);
      res.json(body);
      // body.request_id;
      MESSAGE_QUEUE.push(body.request_id);
    };
  };

  var options = {
    'url': 'https://sandbox-api.uber.com/v1/requests',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + ACCESS_TOKEN
    },
    'json': {
      'product_id': VEHICLES[start_end.product_id],
      'start_latitude': ""+start_end.start_latitude,
      'start_longitude': ""+start_end.start_longitude,
      'end_latitude': ""+start_end.end_latitude,
      'end_longitude': ""+start_end.end_longitude
    }
  }
  request.post(options, cb);
});

app.get('/api/request', function(req, res) {

  if (MESSAGE_QUEUE.length>0) {
    var request_id = MESSAGE_QUEUE.pop();
    console.log(request_id);
  };

  var cb = function(err, result, body) {
    // your code here
    if (err) {
      console.error(err);
    } else { 
      console.log(body);
      res.json(body);
      // body.request_id;
    };
  };

  var options = {
    'url': 'https://sandbox-api.uber.com/v1/requests/' + request_id +"/map",
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + ACCESS_TOKEN
    },
    'json': {

    }
  }
  request.get(options, cb);
});

app.get('/', function(req, res) {
  var access;
  ajax.get({
    url: "https://login.uber.com/oauth/token",
    content: "application/json",
    Authorization: {
      client_id: "i1wKltHiwwoVyJW6gxLCezztn1k5xgYJ",
      client_secret: "OttdwJjgN1juCkTyuvDGA_p24s2qbMMvCOu42dS3"
    }, 
    success: function(code) {
      var access = code;
    }, 
    error: function(err) {
      console.log(err);
    }
  });
  console.log(access);
});


app.delete('/api/request/', function(req, res) {
  var request_id = '211d000c-b8f0-4b70-8efa-2b30e7600530';
  var cb = function(err, result, body) {
    // your code here
    if (err) {
      console.error(err);
    } else { 
      // console.log(result);
      res.json(body);
    };
  }

  var options = {
    'url': 'https://api.uber.com/v1/requests/' + request_id,
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + ACCESS_TOKEN
    }
  }

  request.delete(options, cb);
});


app.listen(port, function() {
  console.log('Hot Spot Server is in action');
});