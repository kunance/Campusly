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


/**
 *
 * @param universityId
 * @param distanceMeters double precision
 * @param cb
 */
module.exports.withinUniversity = function(universityId, distanceMeters, cb) {

  var propertyIds = [];
  var within = "SELECT p.* FROM property p, university u WHERE u.id = :univId AND ST_DWithin(p.geoloc, u.geoloc, :distMeters, false)";
  sequelize.query(within, { replacements: {univId: universityId, distMeters: distanceMeters}}).then(function(properties) {

//    console.log(properties[0]);

    properties[0].forEach( function(property) {
//      console.log(property.id);
      propertyIds.push(property.id);
    });
    cb(propertyIds);
  });
}


/**
 *
 * @param universityId
 * @param roomListings
 * @param sortOrder
 * @param cb
 */
module.exports.sortRoomToUnivDist = function(universityId, roomListings, sortOrder, cb) {

  // IMPORTANT  you should sort only on the roomListing ids passed in (after search) so sorting query doesn't choose
  // all properties in db. When dealing with expensive distance calculations when sorting on distance, prune the search
  // space and sort will NOT become exponentially expensive as the property data-set grows

  if(!roomListings || roomListings.length === 0) {
    cb(null, null);
  }

  var roomListingIds = '(';

  roomListings.forEach(function(rl) {
    if(roomListingIds === '(') {
      roomListingIds = roomListingIds + rl.roomDetails.id;
    }
    else {
      roomListingIds = roomListingIds + ", " + rl.roomDetails.id;
    }
  });
  roomListingIds = roomListingIds + ')'
 // console.log("Room listing ids to order distance against: ", roomListingIds);

  var within = 'SELECT rl.id FROM room_listing as rl, property as prop, university as univ WHERE rl.id IN' + roomListingIds + ' AND univ.id = :univId AND rl."propertyId" = prop.id ORDER BY ST_Distance(univ.geoloc, prop.geoloc)';
  sequelize.query(within, { replacements: {univId: universityId}, type: sequelize.QueryTypes.SELECT }).then(function(roomIds) {

 //   console.log("Room listing ids returned from sort in order of distance from university: ", roomIds);


    if(sortOrder === "descending") {
      roomIds.reverse();
 //     console.log("Reversed room listing: ", roomIds);
    }

    var sortedRoomListings = [];

    roomIds.forEach( function(roomId) {
    //  console.log(roomId);
      for(var rlIndex in roomListings) {
      //  console.log(roomListings[rlIndex].roomDetails.id );
         if(roomListings[rlIndex].roomDetails.id === roomId.id ) {
       //   console.log("Adding room listing: ", roomListings[rlIndex].roomDetails.id, " to sorted list");
           sortedRoomListings.push(roomListings[rlIndex]);
           break;
         }
      }
    });

    cb(null, sortedRoomListings);
  });
}

