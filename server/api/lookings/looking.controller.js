'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var User = sqldb.model('rentedUser');
var Pets = sqldb.model('pet');
var Vehicles = sqldb.model('userVehicle');
var Education = sqldb.model('userEducation');
var University = sqldb.model('university');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var Looking = sqldb.model('looking');
var excludeService = require('../../services/exclude.own');
var Mixpanel = require('mixpanel');
// create an instance of the mixpanel client
var mixpanel = Mixpanel.init('bd202854d110bac5e72d7e034abdae01');

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
  var univId;

  if(req.query['univId']){
    univId = req.query['univId'];
  }

  if(req.param("sortBy")) {
    sortAttrs = [req.param("sortBy")];
  }
  else {
    sortAttrs = ["createdAt"];
  }

  if(req.param("sortOrder") === "descending") {
    sortAttrs.push("DESC");
  }

  var searchCriteria = { activeLooking: true };
  var searchQuery;

  if(req.query.search) {
    searchQuery =  JSON.parse(req.query.search);

    if(searchQuery.moveInDate) { searchCriteria.moveInDate = { gte: searchQuery.moveInDate }; mixpanel.track("looking - search by moveInDate");}
    if(searchQuery.maxMonthlyRent) { searchCriteria.maxMonthlyRent = { lte: searchQuery.maxMonthlyRent }; mixpanel.track("looking - search by maxMonthlyRent");}
    if(searchQuery.numRoommates) { searchCriteria.numRoommates = { lte: searchQuery.numRoommates }; mixpanel.track("looking - search by numRoommates");}
    if(searchQuery.utilitiesIncluded !== null) { searchCriteria.utilitiesIncluded = (searchQuery.utilitiesIncluded === "true"); mixpanel.track("looking - search by utilitiesIncluded");}
    if(searchQuery.roomType !== null) { searchCriteria.roomType = searchQuery.roomType.replace(/"/g, "'"); mixpanel.track("looking - search by roomType");}
    if (searchQuery.gender !== null) {
      searchCriteria.gender = searchQuery.gender.replace(/"/g, "'");
      //searchCriteria.gender = [];
      //searchCriteria.gender.push(searchQuery.gender.replace(/"/g, "'"));
      //searchCriteria.gender.push('no preference');
      //searchCriteria.gender  = _.uniq(searchCriteria.gender);
      mixpanel.track("looking - search by gender");
    }
    if(searchQuery.sharedBathroom !== null) { searchCriteria.sharedBathroom = (searchQuery.sharedBathroom === "true"); mixpanel.track("looking - search by sharedBathroom");}
    if(searchQuery.furnished !== null) { searchCriteria.furnished = (searchQuery.furnished === "true"); mixpanel.track("looking - search by furnished");}
    if(searchQuery.smokingAllowed !== null) { searchCriteria.smokingAllowed = (searchQuery.smokingAllowed === "true"); mixpanel.track("looking - search by smokingAllowed");}
    if(searchQuery.petsAllowed !== null) { searchCriteria.petsAllowed = (searchQuery.petsAllowed === "true"); mixpanel.track("looking - search by petsAllowed");}
    if(searchQuery.parkingNeeded !== null) { searchCriteria.parkingNeeded = (searchQuery.parkingNeeded === "true"); mixpanel.track("looking - search by parkingNeeded");}
    if(searchQuery.openToFullYearLeaseNewRoomates !== null) { searchCriteria.openToFullYearLeaseNewRoomates = (searchQuery.openToFullYearLeaseNewRoomates === "true"); mixpanel.track("looking - search by openToFullYearLeaseNewRoomates");}
  }

  var limit  = ( req.param("limit") ) ? req.param("limit") : 64;
  console.log(limit);
  Looking.findAll({
    where: searchCriteria,
    order: [ sortAttrs ],
    limit: limit,
    include: [
      { model: User, attributes: userAttributes, as: 'relatedUserId',
        include:[
          { model: Education, as: 'usereducationUsers', where:{universityId:univId},
            include:[
              { model: University, as: 'relatedUniversityId'}
            ]}
        ]}
    ]
  }).then(function(lookings) {
    console.log(lookings.length);
    if(lookings && lookings.length > limit) {
      lookings.length = limit;
    }
    else if(lookings.status && lookings.status !== 200) {
      res.status(lookings.status).json(lookings.statusText);
    }
    else {
      res.json(lookings);
    }
  }).catch(function(errors){
    console.log(errors);
    res.status(500).json(errors);
  });
};

exports.showSingleLooking= function(req, res, next) {
  var lookingId = req.params.id;
  var userAttributes = ['firstname', 'lastname', 'profileImage', 'aboutMe', 'email', 'facebook', 'id'];
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
