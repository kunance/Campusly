var sqldb = require('../../../sqldb');
// var Room = sqldb.model('roomListing');
var RoomListing = sqldb.model('roomListing');





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
 *   This creates room in room_listing table
 *
 *
 * @param req   { propertyId: 'string',  monthlyPrice: float  [smokingAllowed]: true|false, {//TODO finish documentation }  }
 *
 *
 * @param res
 * @param next
 */
exports.createRoomListing = function(req, res, next) {

  console.log("Creating new room listing: ", req.body);

  res.json({});

  //var newRoomListing = RoomListing.build(req.body);
  //
  ////TODO rework/research the catching of the error from sequelize and handling of it
  //newRoomListing.save()
  //  .then(function(room) {
  //    res.json({ room: room });
  //  })
  //  .catch(validationError(res));
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






