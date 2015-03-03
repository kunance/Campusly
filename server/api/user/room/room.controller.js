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
exports.createMyRoom = function(req, res, next) {

  var newRoomListing = RoomListing.build(req.body);

  //TODO rework/research the catching of the error from sequelize and handling of it
  newRoomListing.save()
    .then(function(room) {
      res.json({ room: room });
    })
    .catch(validationError(res));
};


/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.getMyRoom = function(req, res, next) {

  User.find({
    where: {
      id: userId
    },
    attributes: [
      'id',
      'username',
      'middlename',
      'confirmedEmail',
      'firstname',
      'email',
      'phone',
      'lastname',
      'profileImage'
    ]
  })
    .then(function(user) {
      if (!user) {
        return res.send(401);
      }
      else{
        res.json(user);
      }
    })
    .catch(function(err) {
      return next(err);
    });


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
exports.getAllMyRooms = function(req, res, next) {


};




/**
 *
 * @param req
 * @param res
 * @param next
 */
exports.deleteMyRoom = function(req, res, next) {

  var room = new Room();

  //var userId = req.params("userId");
  //var id = req.params("id");

  //Room.find( id = id, creatorId = userId {
  //
  //});

};






