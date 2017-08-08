var express = require('express');
var bodyParser = require('body-parser');
var URLController = require('./URL/URLController');
var massive = require('massive');
var secret = require('./secret');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/new/:URL(*)', URLController.shorten);

var port = 3000;

//connect to database, and then start up server
massive(secret.connectionString)
	.then(db => {
		app.set('db', db);

		app.listen(port, function() {
			console.log('Listening on port ' + port);
		});
	});
