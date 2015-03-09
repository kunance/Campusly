'use strict';

var _ = require('lodash');
var sqldb = require('../sqldb');
var User = sqldb.model('rentedUser');
var Property = sqldb.model('property');
var config = require('../config/environment');


/**
 *
 * @param propertyDetails   fields should reflect same as sequelize property model
 * @param cb   callback function with signature (error, valueObject)
 */
exports.createPropertyFromCreateRoom = function(propertyDetails, cb) {

  propertyDetails.createdAt = new Date();

  var newProperty = Property.build(propertyDetails);
  newProperty.save()
    .then(function(property) {
      cb(null, property);
    }).catch(cb({statusCode: 422}, null));
};



