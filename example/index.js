// Load modules
var express = require('express'),
	path = require('path'),
	globalizeExpress = require('globalize-express'),
    mustacheExpress = require('mustache-express'),
	config = require('./config');

var app = express(),
    engine = mustacheExpress();

// Register '.html' extension with The Mustache Express
app.engine('html', engine);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Add globalizeExpress as a middleware to your express app
app.use(globalizeExpress(config));

app.get('/', function(req, res) {
	res.render('example_page', {
		title: req.Globalize.formatMessage('example/title'),
		welcome: req.Globalize.formatMessage('example/welcome'),
		untransalated: req.Globalize.formatMessage('example/untransalated')
	});
});

server = app.listen(process.env.PORT || 3000, function () {
    'use strict';

    var host = server.address().address,
        port = server.address().port;

	console.log('listening at http://%s:%s', host, port)

});