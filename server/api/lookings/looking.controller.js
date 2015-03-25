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

  var sortAttrs;

  if(req.param("sortBy")) {
    sortAttrs = [req.param("sortBy")];
  }
  else {
    // use deafault
    sortAttrs = ["moveInDate"];
  }

  if(req.param("sortOrder") === "descending") {
    sortAttrs.push("DESC");
  }

  var searchCriteria = { activeLooking: true };
  var searchQuery;

  if(req.query.search) {
    searchQuery =  JSON.parse(req.query.search);

    //console.log(searchQuery);
    //console.log(Object.keys(searchQuery));

    if(searchQuery.maxMonthlyRent) { searchCriteria.maxMonthlyRent = { lte: searchQuery.maxMonthlyRent }; }
    if(searchQuery.numRoommates) { searchCriteria.numRoommates = { lte: searchQuery.numRoommates }; }
//  if(propertyType !== null) { searchCriteria.property.type = searchQuery.propertyType; }
    if(searchQuery.utilitiesIncluded !== null) { searchCriteria.utilitiesIncluded = (searchQuery.utilitiesIncluded === "true"); }
    if(searchQuery.roomType !== null) { searchCriteria.roomType = searchQuery.roomType.replace(/"/g, "'"); }
    if(searchQuery.gender !== null) { searchCriteria.gender = searchQuery.gender.replace(/"/g, "'"); }
    if(searchQuery.sharedBathroom !== null) { searchCriteria.sharedBathroom = (searchQuery.sharedBathroom === "true"); }
    if(searchQuery.furnished !== null) { searchCriteria.furnished = (searchQuery.furnished === "true"); }
    if(searchQuery.smokingAllowed !== null) { searchCriteria.smokingAllowed = (searchQuery.smokingAllowed === "true"); }
    if(searchQuery.petsAllowed !== null) { searchCriteria.petsAllowed = (searchQuery.petsAllowed === "true"); }
    if(searchQuery.parkingNeeded !== null) { searchCriteria.parkingNeeded = (searchQuery.parkingNeeded === "true"); }

  }

  var limit  = ( req.param("limit") ) ? req.param("limit") : 100;

  console.log("Limit: ", limit);

  Looking.findAll({
    where: searchCriteria,
    order: [ sortAttrs ],
    limit: limit,
    include: [
      { model: User, attributes: userAttributes, as: 'relatedUserId'
        //,
        //include: [
        //  { model: Pets, as: 'petsUsers'},
        //  { model: Vehicles, as: 'uservehiclesUsers'}]
      }
    ]
  }).then(function(lookings) {

    if(lookings && lookings.length > limit) {
      // to work around bug   https://github.com/sequelize/sequelize/issues/1897
      lookings.length = limit;
    }

    //lookings.forEach(function(e, i, a) {
    //  var roomDetails = e.dataValues;
    //  var propertyDetails = e.relatedPropertyId.dataValues;
    //  propertyDetails.coords = {};
    //  propertyDetails.coords.latitude =   e.relatedPropertyId.dataValues.latitude;
    //  propertyDetails.coords.longitude =   e.relatedPropertyId.dataValues.longitude;
    //  delete  propertyDetails.latitude;
    //  delete propertyDetails.longitude;
    //
    //  var mashed = _.extend({}, { roomDetails: roomDetails }, { propertyDetails: propertyDetails } );
    //  delete mashed.roomDetails.relatedPropertyId;
    //  roomListingsResponse.push(mashed);
    //});

    //console.log(lookings);


    res.json(excludeService.excludeOwn(lookings, req.user.id));

  }).catch(validationError(res));
};

exports.showSingleLooking= function(req, res, next) {
  var lookingId = req.params.id;
  var userAttributes = ['firstname', 'lastname', 'profileImage', 'aboutMe', 'email', 'facebook'];
  Looking.find({
    where:{id: lookingId, activeLooking:true},
    include: [
      { model: User, attributes: userAttributes, as: 'relatedUserId',
        include:[
          { model: Education, as: 'usereducationUsers'},
          { model: Pets, as: 'petsUsers'},
          { model: Vehicles, as: 'uservehiclesUsers'}
        ]}
    ]

  }).then(function(lookings) {
    res.json(lookings)

  }).catch(validationError(res));
};
