'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var University = sqldb.model('university');

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

exports.showAllUniversities= function(req, res, next) {
  var universityAttributes = ['id', 'name', 'shortName'];
  University.findAll({
    where:{},
    attributes:universityAttributes
  }).then(function(universities) {

    //force backend to return universities sorted by id
    var result = universities.sort(function(a, b){
      var x = +a.id,
          y = +b.id;
      // Compare the 2 dates
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    res.json(result)

  }).catch(validationError(res));
};
