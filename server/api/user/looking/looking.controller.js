'use strict';

var _ = require('lodash');
var sqldb = require('../../../sqldb');
var User = sqldb.model('rentedUser');
var Looking = sqldb.model('looking');
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

exports.newLooking = function(req, res, next) {
  req.body.userId = req.user.id;
  req.body.createdAt = new Date();
  var newLooking = Looking.build(req.body);
  newLooking.save()
    .then(function(looking) {
      res.json(looking);
    })
    .catch(validationError(res));
};

exports.showLookings = function(req, res, next) {
  Looking.findAll({where:{userId:req.user.id}})
    .then(function (lookigs) {
      res.json(lookigs);
    })
    .catch(validationError(res));
};

exports.deleteLooking= function(req, res, next) {
  Looking.destroy({where: { id: req.params.id }})
    .then(respondWith(res, 204))
    .catch(handleError(res));
};

exports.getLooking = function(req, res, next) {
  Looking.find({where: { id: req.params.id }})
    .then(function (finance) {
      res.json(finance);
    })
    .catch(handleError(res));
};

exports.saveLooking = function(req, res, next) {
  Looking.find({where: { id: req.params.id }})
    .then(function (looking) {
      var updated = _.merge(looking, req.body);
      updated.save().then(function (upd) {
        res.json(upd);
      })
    })
    .catch(handleError(res));
};


exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
