/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
 // app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/api/users/:id/vehicles', require('./api/user/vehicle'));
  app.use('/api/users/:id/pets', require('./api/user/pet'));
  app.use('/api/users/:id/addresses', require('./api/user/address'));
  app.use('/api/users/:id/educations', require('./api/user/education'));
  app.use('/api/users/:id/finances', require('./api/user/finance'));
  app.use('/api/properties', require('./api/properties'));
  //just temporary route
  app.use('/api/images', require('./api/images'));

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
