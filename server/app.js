/**
 * Main application file
 */

'use strict';

var http = require('http');
var fs = require('fs');

//var options = {
//  key: fs.readFileSync('./server/config/keys/campuslyPrivateKey.pem'),
//  cert: fs.readFileSync('./server/config/keys/campuslyCertificate.pem'),
//  ca: fs.readFileSync('./server/config/keys/campusly-godaddy-cert.pem')
//};

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var sqldb = require('./sqldb');
var config = require('./config/environment');
var update = require('./components/mail/user_update/update.users');

update.updateUsers();

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = http.createServer(app);

//var socketio = require('socket.io')(server, {
//  serveClient: (config.env === 'production') ? false : true,
//  path: '/socket.io-client'
//});
//require('./config/socketio')(socketio);

require('./config/express')(app);
require('./routes')(app);

var io = require('socket.io').listen(server);

// Start server
server.listen(config.port, config.ip, function() {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
