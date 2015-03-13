'use strict';

var _ = require('lodash');
var sqldb = require('../../../sqldb');
var User = sqldb.model('rentedUser');
var Vehicle = sqldb.model('userVehicle');
var passport = require('passport');
var config = require('../../../config/environment');
var jwt = require('jsonwebtoken');


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

exports.newVehicle = function(req, res, next) {
  req.body.userId = req.user.id;
  req.body.createdAt = new Date();
  var newVehicle = Vehicle.build(req.body);

  newVehicle.save()
    .then(function(vehicle) {
      res.json(vehicle);
    })
    .catch(validationError(res));
};


exports.showVehicles= function(req, res, next) {
  Vehicle.findAll({where:{userId:req.userId}})
    .then(function (vehicle) {
      res.json(vehicle);
    })
    .catch(validationError(res));
};

exports.deleteVehicle= function(req, res, next) {
  Vehicle.destroy({where: { id: req.params.id }})
    .then(respondWith(res, 204))
    .catch(handleError(res));
};

exports.getVehicle= function(req, res, next) {
  Vehicle.find({where: { id: req.params.id }})
    .then(function (pets) {
      res.json(pets);
    })
    .catch(handleError(res));
};

exports.saveVehicle= function(req, res, next) {
  Vehicle.find({where: { id: req.params.id }})
    .then(function (vehicle) {
      var updated = _.merge(vehicle, req.body);
      updated.save().then(function (upd) {
        res.json(upd);
      })
    })
    .catch(handleError(res));
};

exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
