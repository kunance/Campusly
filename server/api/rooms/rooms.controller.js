var sqldb = require('../../sqldb');
var Room = sqldb.model('roomListing');

// var Room = require('./../../models/room-listing');



/**
 *   This creates room in room_listing table
 *
 *
 * @param req   { propertyId: 'string',  monthlyPrice: float  [smokingAllowed]: true|false, {//TODO finish documentation }  }
 *
 *
 * @param res
 * @param next
 */
exports.createRoom = function(req, res, next) {

};


/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getRoom = function(req, res, next) {


};


/**
 *
 *  Gets all rooms fully hydrated by default
 *
 *  Use param  min=true for room to return ony
 *  {
 *  image_url:
 *  "value": 818,
    "distance": this is distance to university (//TODO which university ???)
    "kind": 'single' | 'double' | 'living room'
    "num_roomates":
    "bathroom": "Shared",
    "availability_date": "2003-09-24"
    }
 *
 * @param req
 * @param res
 * @param next
 */
exports.getAllRooms = function(req, res, next) {


};




/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.deleteRoom = function(req, res, next) {

  var room = new Room();

  //var userId = req.params("userId");
  //var id = req.params("id");

  //Room.find( id = id, creatorId = userId {
  //
  //});

};





