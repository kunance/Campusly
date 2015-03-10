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
 *  Gets a specific room listing that you created fully hydrated by default
 *
 *
 *
 * @param req
 * @param res
 * @param next
 */
exports.getRoomListing = function(req, res, next) {

  RoomListing.find({where: { id: req.params.id, creatorId: req.params.userId }})
    .then(function(roomListing) {
      res.json(roomListing);
    })
    .catch(function(errors){
      console.log(errors);
      res.json(500);
    });
};


/**
 *
 *  Gets all room listings that is you created fully hydrated by default
 *
 *
 * @param req
 * @param res
 * @param next
 */
exports.getAllRoomListings = function(req, res, next) {

  RoomListing.findAll({where: { creatorId: req.params.userId }})
    .then(function(roomListings) {
      res.json(roomListings);
    })
    .catch(function(errors){
      console.log(errors);
      res.json(500);
    });
};


/**
 *  Edit a specific room listing that you created fully hydrated by default
 *
 * @param req
 * @param res
 * @param next
 */
exports.editRoomListing = function(req, res, next) {

  req.body.updatedAt = new Date();
  RoomListing.find({where: {id: req.params.id, creatorId: req.params.userId}})
    .then(function (roomListing) {

      var viewRoomDetails = _.clone(req.body.room);

      var roomDetails = transView2ModelRoomDetails(viewRoomDetails);

      var updated = _.merge(roomListing, roomDetails);

      updated.save().then(function (updateRoomListing) {
        res.json(updateRoomListing);
      }).catch(function(errors){
        console.log(errors);
        res.json(500);
      });
    })
    .catch(function(errors){
      console.log(errors);
      res.json(500);
    });

};


/**
 *  Delete a specific room listing that you created fully hydrated by default
 *
 *
 * @param req
 * @param res
 * @param next
 */
exports.deleteRoomListing = function(req, res, next) {

  RoomListing.destroy({where: {id: req.params.id, creatorId: req.params.userId}})
    .then(function() {
      res.json(200);
    })
    .catch(function(errors){
      console.log(errors);
      res.json(500);
    });
};








