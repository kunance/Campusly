'use strict';

var _ = require('lodash');
var sqldb = require('../../../sqldb');
var User = sqldb.model('rentedUser');
var Status = sqldb.model('userStatus');
var passport = require('passport');
var config = require('../../../config/environment');


var validationError = function(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
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

exports.newStatus = function(req, res, next) {
  req.body.userId = req.userId;
  req.body.createdAt = new Date();
  var newStatus = Status.build(req.body);
  newStatus
    .save()
    .then(function (status) {
      res.send(status);
    })
    .catch(validationError(res));
};

exports.updateStatus= function(req, res, next) {
  req.body.updatedAt = new Date();
  Status.find({where: { userId: req.userId }})
    .then(function (status) {
      var updated = _.merge(status, req.body);
      updated.save().then(function (upd) {
        res.send(upd);
      })
    })
    .catch(handleError(res));
};

exports.getStatus= function(req, res, next) {
  Status.findOne({where: { userId: req.userId }})
    .then(function (status) {
      res.send(status);
    })
    .catch(function (err) {
      console.log(err);
    });
};

exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
