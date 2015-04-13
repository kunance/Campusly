'use strict';

var Sequelize = require('sequelize'),
  fs                  = require('fs'),
  path                = require('path'),
  util                = require('util'),
  sequelize           = null;

var sqldb = require('../sqldb');
var Address = sqldb.model('addressHistory');
var User = sqldb.model('rentedUser');

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

/**
 * @param userId
 * @param around double precision
 * @param cb
 */
module.exports.getAroundYou = function(userId, around, cb) {
  var addressIds = [];
  var within = 'SELECT a.* FROM address_history a, address_history b WHERE b."userId" = :userId AND ST_DWithin(a.geoloc, b.geoloc, :around, false) ORDER BY ST_Distance(a.geoloc, b.geoloc)';
  sequelize.query(within, { replacements: {userId: userId, around: around}}).then(function(addresses) {
    addresses[0].forEach(function(address) {
      if(address.userId!=userId)
      addressIds.push(address.userId);
    });
    cb(addressIds);
  });
};
