'use strict';

var _ = require('lodash');
var sqldb = require('../../../sqldb');
var User = sqldb.model('rented.rentedUser');
var Education = sqldb.model('rented.userEducation');
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

exports.newEducation = function(req, res, next) {
  req.body.userId = req.user.id;
  req.body.createdAt = new Date();
  console.log(req.body);
  var newEducation = Education.build(req.body);

  newEducation.save()
    .then(function(education) {
      res.json(education);
    })
    .catch(validationError(res));
};

exports.showEducations= function(req, res, next) {
  Education.findAll({where:{userId:req.user.id}})
    .then(function (educations) {
      res.json(educations);
    })
    .catch(validationError(res));
}


exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
