/**
 * Main application file
 */

'use strict';

var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./server/config/keys/campuslyPrivateKey.pem'),
  cert: fs.readFileSync('./server/config/keys/campuslyCertificate.pem')
};

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var sqldb = require('./sqldb');
var config = require('./config/environment');

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = https.createServer(options, app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}
//sqldb.sequelize.sync()
//  .then(startServer)
//  .catch(function(err) {
//    console.log('Server failed to start due to error: %s', err);
//  });
startServer();
// Expose app
exports = module.exports = app;
