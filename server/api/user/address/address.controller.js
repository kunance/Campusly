'use strict';

var _ = require('lodash');
var sqldb = require('../../../sqldb');
var User = sqldb.model('rentedUser');
var Address = sqldb.model('addressHistory');
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

function adoptData(input) {
  var adopted =JSON.parse(JSON.stringify(input));
  adopted.location = {
    latitude: input.latitude,
    longitude: input.longitude
  };
  return adopted;
}

exports.newAddress = function(req, res, next) {
  req.body.userId = req.user.id;
  req.body.createdAt = new Date();
  console.log(req.body);
  var newAddress = Address.build(req.body);

  newAddress.save()
    .then(function(address) {
      res.json(address);
    })
    .catch(validationError(res));
};

exports.showAddresses= function(req, res, next) {
  //Address.findAll({where:{userId:req.user.id}}) //removed for MVP
  Address.findOne({where:{userId:req.user.id}})
    .then(function (addresses) {
      if(addresses) {
        res.json({streetAddress: adoptData(addresses)});
      }else{
        res.json({});
      }
    })
    .catch(validationError(res));
};

exports.getAddress= function(req, res, next) {
  Address.find({where: { id: req.params.id }})
    .then(function (address) {
      address.apt = Number(address.apt);
      res.json(address);
    })
    .catch(handleError(res));
};

exports.saveAddress= function(req, res, next) {
  console.log(req.body);
  Address.find({where: { id: req.params.id }})
    .then(function (address) {
      var updated = _.merge(address, req.body);
      updated.save().then(function (upd) {
        res.json(upd);
      })
    })
    .catch(handleError(res));
};

exports.deleteAddress= function(req, res, next) {
  Address.destroy({where: { id: req.params.id }})
    .then(respondWith(res, 204))
    .catch(handleError(res));
};

exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
