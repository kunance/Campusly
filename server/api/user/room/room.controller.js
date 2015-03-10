var sqldb = require('../../../sqldb');
var RoomListing = sqldb.model('roomListing');
var Property = sqldb.model('property');
var propertySrv = require('../../../services/property.service');
var _ = require('lodash');



function transView2ModelRoomDetails(viewRoomDetails) {
  return _.clone(viewRoomDetails);
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

  console.log("Creating new room listing: ", req.body);

  var propertyDetails = _.clone(req.body.property);

  propertySrv.transView2ModelPropertyDetails(propertyDetails, function(err, transPropertyDetails) {
    propertyDetails = transPropertyDetails;
  });

  propertySrv.createPropertyFromCreateRoom(propertyDetails, function(error, property) {

    if(!error) {
      //var viewRoomDetails = angular.copy(req.body.room);
      //viewRoomDetails.propertyId = property.id;
      //
      //var roomDetails = transView2ModelRoomDetails(viewRoomDetails);
      //
      //var newRoom = RoomListing.build(roomDetails);
      //newRoom.save()
      //  .then(function(roomListing) {
      //
      //    //TODO figure out what to return
      //    res.json({});
      //
      //  }).catch(cb({statusCode: 422}, null));
      res.json({});
    }
    else {
      res.json(error.statusCode);
    }
  });
  res.json({});
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
//
//Creating new room listing:  { room:
//{ monthlyPrice: '100',
//  securityDeposit: '100',
//  monthlyUtilityCost: '100',
//  availableMoveIn: '2015-03-02',
//  leaseEndDate: '03/01/2016',
//  leaseType: 'month-to-month',
//  gender: 'no preference',
//  roomType: 'single',
//  numRoomates: 3,
//  sharedBath: true,
//  furnished: true,
//  parkingAvailable: true,
//  smokingAllowed: true,
//  description: 'cool room',
//  creatorId: '17' },
//  property:
//  { address:
//  { full: '1290 Parkmoor Ave, San Jose, CA 95126, USA',
//    streetNumeric: 1290,
//    streetAddress: 'Parkmoor Ave',
//    city: 'San Jose',
//    country: 'United States',
//    state: 'US',
//    zip: 95126,
//    location: [Object],
//    latitude: 37.3161403,
//    longitude: -121.91009730000002 },
//    type: 'apt',
//      bedrooms: 5,
//    bathrooms: 2 } }







