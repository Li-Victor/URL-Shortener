var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res, next) {
	res.redirect('https://www.google.com');
});

var port = 3000;
app.listen(port, function() {
	console.log('Listening on port ' + port);
});
