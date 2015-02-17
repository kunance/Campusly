'use strict';

var _ = require('lodash');
var sqldb = require('../../../sqldb');
var User = sqldb.model('rented.rentedUser');
var Pet = sqldb.model('rented.pet');
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

exports.newPet = function(req, res, next) {
  req.body.userId = req.user.id;
  req.body.createdAt = new Date();
  var newPet = Pet.build(req.body);
  newPet.save()
    .then(function(pet) {
      res.json(pet);
    })
    .catch(validationError(res));
};

exports.showPets= function(req, res, next) {
  Pet.findAll({where:{userId:req.user.id}})
    .then(function (pets) {
      res.json(pets);
    })
    .catch(validationError(res));
};

exports.deletePet= function(req, res, next) {
  Pet.destroy({where: { id: req.params.id }})
    .then(respondWith(res, 204))
    .catch(handleError(res));
};

exports.getPet= function(req, res, next) {
  Pet.find({where: { id: req.params.id }})
    .then(function (pets) {
      res.json(pets);
    })
    .catch(handleError(res));
};

exports.savePet= function(req, res, next) {
  Pet.find({where: { id: req.params.id }})
    .then(function (pet) {
      var updated = _.merge(pet, req.body);
      updated.save().then(function (upd) {
        res.json(upd);
      })
    })
    .catch(handleError(res));
};

exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
