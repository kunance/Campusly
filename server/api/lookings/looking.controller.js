'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var User = sqldb.model('rentedUser');
var Pets = sqldb.model('pet');
var Vehicles = sqldb.model('userVehicle');
var Education = sqldb.model('userEducation');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var Looking = sqldb.model('looking');
var excludeService = require('../../services/exclude.own');

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
  var userAttributes = ['firstname', 'lastname', 'profileImage', 'aboutMe','id'];
  var lookingAttributes = ['maxMonthlyRent', 'gender', 'id', 'userId', 'moveInDate', 'roomType'];
  Looking.findAll({
    where:{},
    attributes:lookingAttributes,
    include: [
      { model: User, attributes: userAttributes, as: 'relatedUserId',
        include: [
          { model: Pets, as: 'petsUsers'},
          { model: Vehicles, as: 'uservehiclesUsers'}]
      }
    ]
  }).then(function(lookings) {
    res.json(excludeService.excludeOwn(lookings, req.user.id));
    //res.json(lookings);
  }).catch(validationError(res));
};

exports.showSingleLooking= function(req, res, next) {
  var lookingId = req.params.id;
  var userAttributes = ['firstname', 'lastname', 'profileImage', 'aboutMe', 'email'];
  Looking.find({
    where:{id: lookingId},
    include: [
      { model: User, attributes: userAttributes, as: 'relatedUserId',
        include:[
          { model: Education, as: 'usereducationUsers'},
          { model: Pets, as: 'petsUsers'},
          { model: Vehicles, as: 'uservehiclesUsers'}
        ]}
    ]

  }).then(function(lookings) {
    console.log(lookings);
    res.json(lookings)

  }).catch(validationError(res));
};
