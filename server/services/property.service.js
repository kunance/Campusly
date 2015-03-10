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


//  console.log('Property details: ', propertyDetails);

  var newProperty = Property.build(propertyDetails);

  console.log('Property after building: ', newProperty);


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

  propertyDetails.streetNumeric = propertyDetails.address.streetNumeric;
  propertyDetails.streetAddress = propertyDetails.address.streetAddress;
  propertyDetails.city = propertyDetails.address.city;
  propertyDetails.state = propertyDetails.address.state;
  propertyDetails.zip = propertyDetails.address.zip;
  propertyDetails.latitude = propertyDetails.address.location.latitude;
  propertyDetails.longitude = propertyDetails.address.location.longitude;


//  propertyDetails.longitude = -117.235024;

//  if(!propertyDetails.bldg) { delete propertyDetails.bldg; }

  delete propertyDetails.address;

  cb(null,  propertyDetails);
};



