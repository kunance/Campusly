var sqldb = require('../../../sqldb');
var RoomListing = sqldb.model('roomListing');
var Property = sqldb.model('property');
var propertySrv = require('../../../services/property.service');





var validationError = function(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    console.log(err);
    res.json(statusCode, err);
  };
};

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.send(statusCode, err);
  };
}
function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function() {
    res.send(statusCode);
  };
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

  var propertyDetails = angular.clone(req.body.property);

  propertySrv.transView2ModelPropertyDetails(propertyDetails, function(err, transPropertyDetails) {
    propertyDetails = transPropertyDetails;
  });

  propertySrv.createPropertyFromCreateRoom(propertyDetails, function(error, property) {

    if(!error) {
      var roomDetails = angular.copy(req.body.room);
      roomDetails.propertyId = property.id;

      var newRoom = RoomListing.build(roomDetails);
      newRoom.save()
        .then(function(roomListing) {

          //TODO figure out what to return
          res.json({});

        }).catch(cb({statusCode: 422}, null));
    }
    else {
      res.json(error.statusCode);
    }
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






