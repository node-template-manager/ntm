// Load express & body-parser's modules
var express = require('express');
var bodyParser = require('body-parser');

// express for server creation
var app = express();

// ROUTES
var user_routes = require('./routes/user'); // basic example

// MIDDLEWARES


// CONFIGS

// Parse our body to JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Load routes
app.use('/api', user_routes);


module.exports = app;