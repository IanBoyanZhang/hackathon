var express = require('express');

var app = express();

app.listen(8000);
require('./config/middleware.js')(app, express);

// database connection
module.exports = app;