'use strict';

var _ = require('lodash');
var sqldb = require('../../../sqldb');
var User = sqldb.model('rented.rentedUser');
var Address = sqldb.model('rented.addressHistory');
var passport = require('passport');
var config = require('../../../config/environment');
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

exports.newAddress = function(req, res, next) {
  req.body.userId = req.user.id;
  req.body.createdAt = new Date();
  console.log(req.body);
  var newAddress = Address.build(req.body);

  newAddress.save()
    .then(function(vehicle) {
      res.json(vehicle);
    })
    .catch(validationError(res));
};

exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
