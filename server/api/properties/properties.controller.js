'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Property = sqldb.model('rented.property');
var PropertyOwnership = sqldb.model('rented.propertyOwnership');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    console.log(err);
    res.json(statusCode, err);
  };
};

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.send(statusCode, err);
  };
}
function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function() {
    res.send(statusCode);
  };
}

exports.show = function (req, res, next) {
//Todo fetching properties
};


exports.create = function(req, res, next) {
  req.body.createdAt = new Date();
  var newProperty = Property.build(req.body);
  newProperty.save()
    .then(function(property) {
      res.json(property);
    })
    .catch(validationError(res));
};
