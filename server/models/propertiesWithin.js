'use strict';

var Sequelize = require('sequelize'),
  fs                  = require('fs'),
  path                = require('path'),
  util                = require('util'),
  sequelize           = null;

var sqldb = require('../sqldb');
var RoomListing = sqldb.model('roomListing');
var Property = sqldb.model('property');
var University = sqldb.model('university');

var config = require('../config/environment');


/**
 * Sets up connection to db
 * @param {string} database - Name of the database to connect
 * @param {string} username - Username of the database
 * @param {string} password - Password of the database
 * @param {Object} obj - Object to pass new Sequelize() function. See Sequelize for details.
 * @example

 */
var setup = function (database, username, password, obj) {
  if (typeof obj !== 'object') { obj = {}; }
  if (obj.dialect === undefined || obj.dialect === null) { obj.dialect = 'postgres'; }

  if (arguments.length === 2) {
    sequelize = new Sequelize(database, username);
  } else if (arguments.length === 3) {
    sequelize = new Sequelize(database, username, password);
  } else if (arguments.length === 4) {
    sequelize = new Sequelize(database, username, password, obj);
  }
};


setup(config.sequelize.db, config.sequelize.username, config.sequelize.password, config.sequelize.options);


module.exports.within = function(cb) {

  var propertyIds = [];
  var within = "SELECT p.* FROM property p, university u WHERE u.id = 2 AND ST_DWithin(p.geoloc, u.geoloc, 5000)";
  sequelize.query(within).then(function(properties) {

//    console.log(properties[0]);

    properties[0].forEach( function(property) {
//      console.log(property.id);
      propertyIds.push(property.id);
    });
    cb(propertyIds);
  });
}

