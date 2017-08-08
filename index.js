var express = require('express');
var bodyParser = require('body-parser');
var URLController = require('./URL/URLController');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/new/:URL(*)', URLController.shorten);

var port = 3000;
app.listen(port, function() {
	console.log('Listening on port ' + port);
});
