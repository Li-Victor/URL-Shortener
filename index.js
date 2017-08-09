var express = require('express');
var bodyParser = require('body-parser');
var URLController = require('./URL/URLController');
var massive = require('massive');
var secret = require('./secret');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//middleware for static pages
app.use('/', express.static(__dirname + '/public'));

app.get('/', function (req, res, next) {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/new/:URL(*)', URLController.shorten);
app.get('/:id', URLController.redirectURL);

var port = 3000;

//all other Requests
app.all('*', function (req, res, next) {
    res.status(404).send({
        error: 'error'
    });
});

//connect to database, and then start up server
massive(secret.connectionString)
	.then(db => {
		app.set('db', db);

		app.listen(port, function() {
			console.log('Listening on port ' + port);
		});
	});
