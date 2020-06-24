var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var expressSession = require('express-session');


var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');


app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(expressSession({
	secret: 'asd1@#sad1414!!!d1DDbdYiUHG2#12dsac142388',
	resave: false,
	saveUninitialized: false
}));




consign({cwd: process.cwd()+'\app'})
	.include('routes')
	.then('config/dbConnection.js')
	.then('models')
	.then('controllers')
	.into(app);

module.exports = app;
