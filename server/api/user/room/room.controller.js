var sqldb = require('../../../sqldb');
var RoomListing = sqldb.model('roomListing');
var Property = sqldb.model('property');
var propertySrv = require('../../../services/property.service');
var _ = require('lodash');



function transView2ModelRoomDetails(viewRoomDetails) {
  return viewRoomDetails;
}

function transModel2ViewRoomDetails(viewRoomDetails) {

  //viewRoomDetails.availableMoveIn = ;
  //viewRoomDetails.leaseEndDate
  return viewRoomDetails;
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

  var propertyDetails = _.clone(req.body.property);

  propertySrv.transView2ModelPropertyDetails(propertyDetails, function(err, transPropertyDetails) {

 //   console.log(propertyDetails === transPropertyDetails);

    propertySrv.createPropertyFromCreateRoom(transPropertyDetails, function (error, property) {

      if (!error) {

        var viewRoomDetails = _.clone(req.body.room);
        viewRoomDetails.propertyId = property.id;

        var roomDetails = transView2ModelRoomDetails(viewRoomDetails);
        roomDetails.createdAt = new Date();

        var newRoom = RoomListing.build(roomDetails);
        newRoom.save()
          .then(function(roomListing) {

            res.json(roomListing);

          }).catch(function(errors) {

            console.log(errors);
            res.status(500).json(errors);

          });
      }
      else {
        res.status(500).json(error.statusCode);
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

  var roomAttributes = ["monthlyPrice", "securityDeposit", "availableMoveIn", "leaseEndDate", "leaseType", "gender",
    "monthlyUtilityCost", "roomType", "sharedBathroom", "numRoomates", "furnished", "parkingAvailable", "smokingAllowed",
    "description", "createdAt", "updatedAt"];


  var propertyAttributes = [ "streetNumeric", "streetAddress", "city", "state", "zip", "apt", "bldg", "latitude", "longitude", "type",
    "description", "bedrooms","bathrooms", "parkingSpots", "livingAreaSqFt", "hoaFee", "otherFee", "status" ];


  RoomListing.find({where: { id: req.params.id, creatorId: req.userId }, attributes: roomAttributes, include:
    [ {model: Property,  attributes: propertyAttributes, as: 'relatedPropertyId'}]})
    .then(function(roomListing) {
      if(roomListing.status && roomListing.status !== 200) {
        res.status(roomListing.status).json(roomListing.statusText);
      }
      else {
        roomListing = transModel2ViewRoomDetails(roomListing);
        res.json(roomListing);
      }
    })
    .catch(function(errors){
      console.log(errors);
      res.status(500).json(errors);
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

  var roomAttributes = ["monthlyPrice", "securityDeposit", "availableMoveIn", "leaseEndDate", "leaseType", "gender",
    "monthlyUtilityCost", "roomType", "sharedBathroom", "numRoomates", "furnished", "parkingAvailable", "smokingAllowed",
    "description", "createdAt", "updatedAt"];


  var propertyAttributes = [ "streetNumeric", "streetAddress", "city", "state", "zip", "apt", "bldg", "latitude", "longitude", "type",
    "description", "bedrooms","bathrooms", "parkingSpots", "livingAreaSqFt", "hoaFee", "otherFee", "status" ];

  RoomListing.findAll({where: { creatorId: req.userId }, attributes: roomAttributes, include:
    [ {model: Property,  attributes: propertyAttributes, as: 'relatedPropertyId'}]})
    .then(function(roomListings) {
      if(roomListings.status && roomListings.status !== 200) {
        res.status(roomListings.status).json(roomListings.statusText);
      }
      else {
        res.json(roomListings);
      }
    })
    .catch(function(errors){
      console.log(errors);
      res.status(500).json(errors);
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
  RoomListing.find({where: {id: req.params.id, creatorId: req.userId}})
    .then(function (roomListing) {

  //    console.log('original model from db:  ', roomListing);

      var viewRoomDetails = _.clone(req.body.room);

      var roomDetails = transView2ModelRoomDetails(viewRoomDetails);

      var updated = _.merge(roomListing, roomDetails);

  //    console.log('Updated model:  ', updated);

      updated.save().then(function (updateRoomListing) {
        res.json(updateRoomListing);
      }).catch(function(errors){
        console.log(errors);
        res.status(500).json(errors);
      });
    })
    .catch(function(errors){
      console.log(errors);
      res.status(500).json(errors);
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

  RoomListing.destroy({where: {id: req.params.id, creatorId: req.userId}})
    .then(function() {
      res.json(200);
    })
    .catch(function(errors){
      console.log(errors);
      res.status(500).json(errors);
    });
};








