var express = require('express');
var app = express();
var http = require('http');
var path = require('path');

// simple logger
app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});

app.use('/', express.static(path.join(__dirname, '../angular/build')));

var server = app.listen(8000, '0.0.0.0', function() {
    console.log('Listening on port %d', server.address().port);
});
