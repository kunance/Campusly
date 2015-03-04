'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var User = sqldb.model('rentedUser');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var Looking = sqldb.model('looking');

var validationError = function(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    console.log(err);
    res.status(statusCode, err);
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

exports.showAllLookings= function(req, res, next) {
  var userAttributes = ['firstname', 'lastname', 'profileImage', 'aboutMe'];
  var lookingAttributes = ['distanceToUniv', 'maxMonthlyRent', 'gender'];
  Looking.findAll({
    where:{},
    attributes:lookingAttributes,
    include: [
      { model: User, attributes: userAttributes, as: 'relatedUserId'}
    ]
  }).then(function(lookings) {
    res.json(lookings)

  }).catch(validationError(res));
};
