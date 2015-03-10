var sqldb = require('../../../sqldb');
var RoomListing = sqldb.model('roomListing');
var Property = sqldb.model('property');
var propertySrv = require('../../../services/property.service');
var _ = require('lodash');



function transView2ModelRoomDetails(viewRoomDetails) {
  viewRoomDetails.gender = '"no preference"';
  return viewRoomDetails;
  // return _.clone(viewRoomDetails);
}

/**
 *   This creates room in room_listing table and a property in the property table
 *
 *   In the future, allow adding a room to an exiting property using exitingPropertyId
 *
 *
 * @param req   request body parameters for both a room and property model:
 *
 * { room: roomObject, property: propertyObj, exitingPropertyId }
 *
 *
 * @param res
 * @param next
 */
exports.createRoomListing = function(req, res, next) {

//  console.log("Creating new room listing: ", req.body);

  var propertyDetails = _.clone(req.body.property);

  propertySrv.transView2ModelPropertyDetails(propertyDetails, function(err, transPropertyDetails) {

    propertyDetails = transPropertyDetails;

    propertySrv.createPropertyFromCreateRoom(propertyDetails, function (error, property) {

      if (!error) {

        var viewRoomDetails = _.clone(req.body.room);
        viewRoomDetails.propertyId = 2;

        var roomDetails = transView2ModelRoomDetails(viewRoomDetails);
        roomDetails.createdAt = new Date();

        var newRoom = RoomListing.build(roomDetails);
        newRoom.save()
          .then(function(roomListing) {

            //TODO figure out what to return
            res.json({});

          }).catch(function(errors) {
            console.log(errors);
            res.json(500);
          });
      }
      else {
        res.json(error.statusCode);
      }
    });
  });
};


/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getRoomListing = function(req, res, next) {

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
exports.getAllRoomListings = function(req, res, next) {


};


/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.editRoomListing = function(req, res, next) {


};


/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.deleteRoomListing = function(req, res, next) {

  var room = new Room();

  //var userId = req.params("userId");
  //var id = req.params("id");

  //Room.find( id = id, creatorId = userId {
  //
  //});

};








