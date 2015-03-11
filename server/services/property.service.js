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


 // console.log('Property details: ', propertyDetails);

  var newProperty = Property.build(propertyDetails);

 // console.log('Property after building: ', newProperty);

  newProperty.save()
    .then(function(property) {
      cb(null, property);
    }).catch( function(errors) {
      console.log(errors);
      cb({statusCode: 500}, null);
    });
};


/**
 *  Ensure data/service model can be different from view model by providing this translation layer
 *
 * @param propertyDetails
 * @param cb
 */
exports.transView2ModelPropertyDetails = function(propertyDetails, cb) {


  propertyDetails.latitude = propertyDetails.streetAddress.location.latitude;
  propertyDetails.longitude = propertyDetails.streetAddress.location.longitude;
  propertyDetails.streetNumeric = propertyDetails.streetAddress.streetNumeric;
  propertyDetails.city = propertyDetails.streetAddress.city;
  propertyDetails.state = propertyDetails.streetAddress.state;
  propertyDetails.zip = propertyDetails.streetAddress.zip;
  propertyDetails.streetAddress = propertyDetails.streetAddress.streetAddress;

  cb(null,  propertyDetails);
};



