/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/users', require('./api/user'));

  app.use('/api/users/:userId/vehicles', require('./api/user/vehicle'));
  app.use('/api/users/:userId/pets', require('./api/user/pet'));
  app.use('/api/users/:userId/addresses', require('./api/user/address'));
  app.use('/api/users/:userId/educations', require('./api/user/education'));
  app.use('/api/users/:userId/finances', require('./api/user/finance'));
  app.use('/api/users/:userId/occupations', require('./api/user/occupation'));
  app.use('/api/users/:userId/roommates', require('./api/user/roommates'));
  app.use('/api/properties', require('./api/properties'));
  //just temporary route
  app.use('/api/images', require('./api/images'));


  // pass in a min parameter for non fully hydrated room listing ... define what min is in the api documentation
  app.use('/api/rooms', require('./api/rooms') );

  // user managing their own room listing
  app.use('/api/users/:userId/rooms', require('./api/user/room') );


  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
