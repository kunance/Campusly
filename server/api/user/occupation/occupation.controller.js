'use strict';

var _ = require('lodash');
var sqldb = require('../../../sqldb');
var User = sqldb.model('rentedUser');
var Occupation = sqldb.model('userOccupation');
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

exports.newOccupation = function(req, res, next) {
  req.body.userId = req.user.id;
  req.body.createdAt = new Date();
  console.log(req.body);
  var newOccupation = Occupation.build(req.body);

  newOccupation.save()
    .then(function(occupation) {
      res.json(occupation);
    })
    .catch(validationError(res));
};

exports.showOccupations= function(req, res, next) {
  Occupation.findAll({where:{userId:req.user.id}})
    .then(function (occupation) {
      res.json(occupation);
    })
    .catch(validationError(res));
};

exports.deleteOccupation= function(req, res, next) {
  Occupation.destroy({where: { id: req.params.id }})
    .then(respondWith(res, 204))
    .catch(handleError(res));
};

exports.getOccupation= function(req, res, next) {
  Occupation.find({where: { id: req.params.id }})
    .then(function (occupation) {
      res.json(occupation);
    })
    .catch(handleError(res));
};

exports.saveOccupation= function(req, res, next) {
  Occupation.find({where: { id: req.params.id }})
    .then(function (occupation) {
      var updated = _.merge(occupation, req.body);
      updated.save().then(function (upd) {
        res.json(upd);
      })
    })
    .catch(handleError(res));
};


exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
