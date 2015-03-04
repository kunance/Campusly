'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var User = sqldb.model('rentedUser');
var Property = sqldb.model('property');
var PropertyOwnership = sqldb.model('propertyOwnership');
var PropertyOwner = sqldb.model('propertyOwner');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

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

exports.show = function (req, res, next) {
//Todo fetching property
};

exports.showAllProperties= function(req, res, next) {
  PropertyOwner.findAll({
    where: {
      ownerId:req.body.userId
    }})
    .then(function(properties) {
    res.json(properties)
  })
    .catch(validationError(res));
};

exports.createProperty = function(req, res, next) {
  req.body.createdAt = new Date();
  var newProperty = Property.build(req.body);
  newProperty.save()
    .then(function(property) {
      var newPropertyOwnership = PropertyOwnership.build(
        {
          startDate: new Date(),
          endDate: new Date(),
          createdAt: new Date(),
          propertyFK:property.id
        });
      newPropertyOwnership.save().then(function (ship) {
        var newPropertyOwner = PropertyOwner.build(
          {
            propertyOwnershipId: ship.id,
            ownerId: req.body.userId,
            createdAt: new Date()
          });
        newPropertyOwner.save().then(function (owner) {
          res.json(owner);
        }).catch(validationError(res))
      }).catch(validationError(res))
    }).catch(validationError(res));

};

//return sequelize.transaction(function (call) {
//  return Property.create({
//    //ode ide property
//  }, {transaction: t}).then(function (property) {
//    return Ownership.create({
//      //ide iskoristiš id od propertia
//    }, {transaction: t}).then(function (ownership) {
//      return Owner.create({
//        //ide iskoristiš id od ownershipa + id od rented_usera
//      }, {transaction: t});;
//    });
//  }).then(function (result) {
//    //ovaj then se izvrši kad je sve prošlo u redu
//  }).catch(function (err) {
//    // ovaj catch se izvrši ako je bilo koji od koraka roknija
//
//  });
