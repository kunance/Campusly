var sequelize = require('sequelize');
var sqldb = require('../../sqldb');
var RoomListing = sqldb.model('roomListing');
var Property = sqldb.model('property');
var User = sqldb.model('rentedUser');
var UserEducation = sqldb.model('userEducation');
var _ = require('lodash');
var excludeService = require('../../services/exclude.own');
var propertiesWithin = require('../../models/propertiesWithin');
var Mixpanel = require('mixpanel');
// create an instance of the mixpanel client
var mixpanel = Mixpanel.init('bd202854d110bac5e72d7e034abdae01');


var miles2Meters = 1609.34;
/**
 * Retrieve a specific room listing with both the room listing and property details.  Default behavior is to return
 *  a fully hydrated model unless a filter is used in the query.
 *
 * Attribute filters coming soon in order to specify only what you want in the return object
 *
 *
 * @param req
 * @param res
 * @param next
 */
exports.getRoomListing = function(req, res, next) {

  var roomAttributes = ["id", "monthlyPrice", "securityDeposit", "availableMoveIn", "leaseEndDate", "leaseType", "gender",
    "monthlyUtilityCost", "roomType", "sharedBathroom", "numRoomates", "furnished", "parkingAvailable", "smokingAllowed", "petsAllowed",
    "description", "createdAt", "updatedAt", "creatorId"];

  var propertyAttributes = [ "streetNumeric", "streetAddress", "city", "state", "zip", "apt", "bldg", "latitude",
    "longitude", "type", "description", "bedrooms","bathrooms", "parkingSpots", "livingAreaSqFt", "hoaFee", "otherFee",
    "status" ];

  var creatorAttributes = ["email", "facebook"];

  RoomListing.find({
    where: {
      id: req.param("id"), activeRoom:true
    },
    attributes: roomAttributes,
    include: [
      {model: Property,  attributes: propertyAttributes, as: 'relatedPropertyId'},
      {
        model: User, attributes: creatorAttributes, as: 'relatedCreatorId'
      }]
   })
    .then(function(roomListing) {

    var roomDetails = roomListing.dataValues;
    var propertyDetails = roomListing.relatedPropertyId.dataValues;

    propertyDetails.coords = {};
    propertyDetails.coords.latitude =   roomListing.relatedPropertyId.dataValues.latitude;
    propertyDetails.coords.longitude =   roomListing.relatedPropertyId.dataValues.longitude;

    delete propertyDetails.latitude;
    delete propertyDetails.longitude;


    var roomListingResponse = _.extend({}, { roomDetails: roomDetails }, { propertyDetails: propertyDetails } );

    delete roomListingResponse.roomDetails.relatedPropertyId;

   // console.log('Room Listing: ', roomListingResponse);

    res.json(roomListingResponse);
  });
};


/**
 *
 * @param req
 * @param res
 * @param next
 * @param searchCriteria
 * @param propertyIds
 * @private
 */
var _getAllRoomListings = function(req, res, searchCriteria, propertyIdsWithinSearchRange, cb) {

  var roomAttributes = ["id", "monthlyPrice", "securityDeposit", "availableMoveIn", "leaseEndDate", "leaseType", "gender",
    "monthlyUtilityCost", "roomType", "sharedBathroom", "numRoomates", "furnished", "parkingAvailable", "smokingAllowed",
    "description", "createdAt", "updatedAt", "creatorId"];


  var propertyAttributes = [ "id", "streetNumeric", "streetAddress", "city", "state", "zip", "apt", "bldg", "latitude", "longitude", "type",
    "description", "bedrooms","bathrooms", "parkingSpots", "livingAreaSqFt", "hoaFee", "otherFee", "status" ];

  var roomListingsResponse = [];


  var sortAttrs;
  var sortBy = req.param("sortBy");

  if(sortBy && sortBy !== "distanceToMyUniversity") {
      sortAttrs = [req.param("sortBy")];
  }
  else {
    // use default
    sortAttrs = ["createdAt"];
  }

  if(req.param("sortOrder") === "descending") {
    sortAttrs.push("DESC");
  }


  var limit  = ( req.param("limit") ) ? req.param("limit") : 64;

  var propertyIdWhere = null;
  if(propertyIdsWithinSearchRange) {
    propertyIdWhere = {id: {in: propertyIdsWithinSearchRange} };
  }

  RoomListing.findAll({
    where: [searchCriteria],
    order: [sortAttrs],
    attributes: roomAttributes,
    limit: limit,
    include: [{
      model: Property,
      attributes: propertyAttributes,
      as: 'relatedPropertyId',
      where: propertyIdWhere
    }]
  })
    .then(function (roomListings) {

      roomListings.forEach(function (e, i, a) {
        var roomDetails = e.dataValues;
        var propertyDetails = e.relatedPropertyId.dataValues;
        propertyDetails.coords = {};
        propertyDetails.coords.latitude = e.relatedPropertyId.dataValues.latitude;
        propertyDetails.coords.longitude = e.relatedPropertyId.dataValues.longitude;
        delete  propertyDetails.latitude;
        delete propertyDetails.longitude;


        var mashed = _.extend({}, {roomDetails: roomDetails}, {propertyDetails: propertyDetails});
        delete mashed.roomDetails.relatedPropertyId;
        roomListingsResponse.push(mashed);
      });

      // console.log('Room Listings: ', roomListingResponse);
      cb(excludeService.excludeOwn(roomListingsResponse, req.user.id));
    });
};


/**
 *  Gets all room listings with room listing and property details.  Default behavior is to return fully hydrated
 *  models unless a filter is used in the query.
 *
 *  Attribute filters coming soon in order to specify only what you want in the return object
 *
 *  Limit as query parameter  { limit: positive integer }     default value is 100
 *
 *  Sort as query parameters
 *    {sortBy: ['monthlyPrice' | 'availableMoveIn' | 'distanceToMyUniversity'],
 *        sortOrder: ['ascending' | 'descending'] }
 *        defaults   'availableMoveIn' , 'ascending'
 *
 *
 *  Search as query parameters
 *     { maxMonthlyPrice: null,
        leaseType: null,
        maxCurrentRoomates: null,
        propertyType: null,
        sharedBathroom: null,
        roomType : null,
        furnished: null,
        smokingAllowed: null,
        gender: null,
        petsAllowed: null,
        parkingAvailable: null,
        within: { location: { latitude double in 8.3 format, longitude double in 8.2 format } |
                            place: { type: 'univ' | 'prop', id: 'id'} },  distance: double precision in miles }

        currently ONLY within: { place: { type: univ } }, distance } is supported AND it is your university so don't
        have to pass in the university id
 *
 *
 *
 * @param req
 * @param res   array of objects { roomDetails: roomDetails, propertyDetails: propertyDetails }
 * @param next
 */
exports.getAllRoomListings = function(req, res, next) {

  var sortBy = req.param("sortBy");
  var sortOrder = req.param("sortOrder");
  var univId;

  if (sortBy && sortBy === "distanceToMyUniversity") {

    univId = req.param("univId");

    //if (!univId) {
    //  return res.status(400).send("can not determine distances from your university since unable to determine your university");
    //}

    // IMPORTANT you should search than sort when dealing with distance since sorting distance on all properties
    // before pruning the result set via search will become exponentially expensive as the property dataset grows
    _parseSearchCriteria(req, res, function (err, searchCriteria, propertyIdsWithinSearchRange) {
      if (err) {
        res.status(err.status).send(err);
      }
      else {
        _getAllRoomListings(req, res, searchCriteria, propertyIdsWithinSearchRange, function (roomListings) {
          if(roomListings.length === 0) {
            res.json(roomListings);
          }
          else {
            if (univId) {
              propertiesWithin.sortRoomToUnivDist(univId, roomListings, sortOrder, function (err, sortedRoomListings) {
                res.json(sortedRoomListings);
              })
            }
            else {
              res.json(roomListings);
            }
          }
        });
      }
    });
    //});
  }
  else {
    _parseSearchCriteria(req, res, function (err, searchCriteria, propertyIdsWithinSearchRange) {
      if(err) {
        res.status(err.status).send(err);
      }
      else {
        _getAllRoomListings(req, res, searchCriteria, propertyIdsWithinSearchRange, function (roomListings) {
          res.json(roomListings);
        });
      }
    });
  }
};

/**
 *
 * @param req
 * @param res
 * @param cb
 */
var _parseSearchCriteria = function(req, res, cb) {
  var searchCriteria = { activeRoom: true };
  var searchQuery;

  if(req.query.search) {
    searchQuery = JSON.parse(req.query.search);

    if (searchQuery.availableMoveIn) {
      searchCriteria.availableMoveIn = {gte: searchQuery.availableMoveIn};
      mixpanel.track("rooms - search by availableMoveIn");
    }
    if (searchQuery.maxMonthlyPrice) {
      searchCriteria.monthlyPrice = {lte: searchQuery.maxMonthlyPrice};
      mixpanel.track("rooms - search by maxMonthlyPrice");
    }
    if (searchQuery.maxCurrentRoomates) {
      searchCriteria.numRoomates = {lte: searchQuery.maxCurrentRoomates};
      mixpanel.track("rooms - search by maxCurrentRoomates");
    }
    if (searchQuery.leaseType !== null) {
      searchCriteria.leaseType = searchQuery.leaseType.replace(/"/g, "'");
      mixpanel.track("rooms - search by leaseType");
    }
    if (searchQuery.roomType !== null) {
      searchCriteria.roomType = searchQuery.roomType.replace(/"/g, "'");
      mixpanel.track("rooms - search by roomType");
    }
    if (searchQuery.gender !== null) {
      searchCriteria.gender = [];
      searchCriteria.gender.push(searchQuery.gender.replace(/"/g, "'"));
      searchCriteria.gender.push('no preference');
      searchCriteria.gender  = _.uniq(searchCriteria.gender);
      mixpanel.track("rooms - search by gender");
    }
    if (searchQuery.sharedBathroom !== null) {
      searchCriteria.sharedBathroom = (searchQuery.sharedBathroom === "true");
      mixpanel.track("rooms - search by sharedBathroom");
    }
    if (searchQuery.furnished !== null) {
      searchCriteria.furnished = (searchQuery.furnished === "true");
      mixpanel.track("rooms - search by furnished");
    }
    if (searchQuery.smokingAllowed !== null) {
      searchCriteria.smokingAllowed = (searchQuery.smokingAllowed === "true");
      mixpanel.track("rooms - search by smokingAllowed");
    }
    if (searchQuery.petsAllowed !== null) {
      searchCriteria.petsAllowed = (searchQuery.petsAllowed === "true");
      mixpanel.track("rooms - search by petsAllowed");
    }
    if (searchQuery.parkingAvailable !== null) {
      searchCriteria.parkingAvailable = (searchQuery.parkingAvailable === "true");
      mixpanel.track("rooms - search by parkingAvailable");
    }
    if (searchQuery.within) {

      // assumed searchQuery.within = { place: { type: 'univ', id: 'id" }, distance  since API only support that now
      //if(!searchQuery.within.place || !searchQuery.within.place.id || !searchQuery.within.distance) {
      //  return cb( {status: 400, errorMsg: "You must provide a place id and distance when you try to search with a specific distance" } );
      //}

      propertiesWithin.withinUniversity(searchQuery.within.place.id, searchQuery.within.distance * miles2Meters,
        function (propertyIds) {
        cb(null, searchCriteria, propertyIds);
      });
    }
    else {
      cb(null, searchCriteria);
    }
  }
  else {
    cb(null, searchCriteria);
  }
};

/**
 *
 * @param userId
 * @param cb
 * @private
 */
var _getMyCurrentUnivId = function(userId, cb) {

  // TODO add an active or most recent attribute to the search once the UserEducation model has it
  UserEducation.findAll({
    where: [ { userId: userId } ],
    attributes: ["universityId"]
  }).then(function(universityIds) {
    if(universityIds && universityIds[0])
    {
      cb(universityIds[0].dataValues.universityId);
    }
    else {
      cb(null);
    }
  });
};










