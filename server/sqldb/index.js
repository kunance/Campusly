/**
 * Sequelize initialization module
 */

'use strict';

var path = require('path');
var config = require('../config/environment');
var orm = require('../models');

var Sequelize = require('sequelize');

orm.setup(config.sequelize.db, config.sequelize.username, config.sequelize.password, config.sequelize.options);


//var db = {
//  Sequelize: Sequelize,
//  sequelize: new Sequelize(config.sequelize.db, config.sequelize.username, config.sequelize.password, config.sequelize.options)
//};

//db.Thing = db.sequelize.import(path.join(
//  config.root,
//  'server',
//  'api',
//  'thing',
//  'thing.model'
//));
//
//db.User = db.sequelize.import(path.join(
//  config.root,
//  'server',
//  'api',
//  'user',
//  'user.model'
//));

// Insert models below

//orm.model('rented.rentedUser').getterMethods = {
//  // Public profile information
//  profile: function() {
//    return {
//      'name': this.name,
//      'role': this.role
//    };
//  },
//
//  // Non-sensitive info we'll be putting in the token
//  token: function() {
//    return {
//      '_id': this._id,
//      'role': this.role
//    };
//  }
//};

module.exports = orm;
