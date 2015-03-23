var sqldb = require('../../sqldb');
var RoomListing = sqldb.model('roomListing');
var Property = sqldb.model('property');
var User = sqldb.model('rentedUser');
var Roommate = sqldb.model('roommate');
var Education = sqldb.model('userEducation');
var _ = require('lodash');
var excludeService = require('../../services/exclude.own');

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

  //console.log(req.params.sortBy);
  //console.log(req.params.sortOrder);

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
 *  Gets all room listings with room listing and property details.  Default behavior is to return fully hydrated
 *  models unless a filter is used in the query.
 *
 *  Attribute filters coming soon in order to specify only what you want in the return object
 *
 *  Sort {sortBy: ['monthlyPrice' | 'availableMoveIn' | 'distanceToMyUniversity'],
 *        sortOrder: ['ascending' | 'descending'] }
 *        defaults   'availableMoveIn' , 'ascending'
 *
 *
 *  Search { maxMonthlyPrice: null,
            leaseType: null,
            maxCurrentRoomates: null,
            propertyType: null,
            sharedBathroom: null,
            roomType : null,
            furnished: null,
            smokingAllowed: null,
            gender: null,
            petsAllowed: null,
            parkingAvailable: null }
 *
 *  Search criteria coming to support searching with a specific distance.  For example, if you use distance,
 *    you MUST pass in latitude and longitude:
 *
 *     lat=double in 8.3 format
 *     long=double in 8.2 format
 *     distance=whole number in miles
 *
 *     Passing in lat, long to the api supports current location using mobile, your university, your current
 *         home address, your gf/bf address, ...
 *
 *
 *
 * @param req
 * @param res   array of objects { roomDetails: roomDetails, propertyDetails: propertyDetails }
 * @param next
 */
exports.getAllRoomListings = function(req, res, next) {
  var roomAttributes = ["id", "monthlyPrice", "securityDeposit", "availableMoveIn", "leaseEndDate", "leaseType", "gender",
    "monthlyUtilityCost", "roomType", "sharedBathroom", "numRoomates", "furnished", "parkingAvailable", "smokingAllowed",
    "description", "createdAt", "updatedAt", "creatorId"];


  var propertyAttributes = [ "id", "streetNumeric", "streetAddress", "city", "state", "zip", "apt", "bldg", "latitude", "longitude", "type",
   "description", "bedrooms","bathrooms", "parkingSpots", "livingAreaSqFt", "hoaFee", "otherFee", "status" ];

  var roomListingsResponse = [];

  //console.log(req.param("sortBy"));
  //console.log(req.param("sortOrder"));

  //console.log(req.query);

  var sortAttrs;

  if(req.param("sortBy")) {
    sortAttrs = [req.param("sortBy")];
  }
  else {
    // use deafault
    sortAttrs = ["availableMoveIn"];
  }

  if(req.param("sortOrder") === "descending") {
    sortAttrs.push("DESC");
  }

  var searchCriteria = { activeRoom: true };
  var searchQuery;

  if(req.query.search) {
    searchQuery =  JSON.parse(req.query.search);

    //console.log(searchQuery);
    //console.log(Object.keys(searchQuery));

    if(searchQuery.maxMonthlyPrice) { searchCriteria.monthlyPrice = { lte: searchQuery.maxMonthlyPrice }; }
    if(searchQuery.maxCurrentRoomates) { searchCriteria.numRoomates = { lte: searchQuery.maxCurrentRoomates }; }
//  if(propertyType !== null) { searchCriteria.property.type = searchQuery.propertyType; }
    if(searchQuery.leaseType !== null) { searchCriteria.leaseType = searchQuery.leaseType.replace(/"/g, "'"); }
    if(searchQuery.roomType !== null) { searchCriteria.roomType = searchQuery.roomType.replace(/"/g, "'"); }
    if(searchQuery.gender !== null) { searchCriteria.gender = searchQuery.gender.replace(/"/g, "'"); }
    if(searchQuery.sharedBathroom !== null) { searchCriteria.sharedBathroom = (searchQuery.sharedBathroom === "true"); }
    if(searchQuery.furnished !== null) { searchCriteria.furnished = (searchQuery.furnished === "true"); }
    if(searchQuery.smokingAllowed !== null) { searchCriteria.smokingAllowed = (searchQuery.smokingAllowed === "true"); }
    if(searchQuery.petsAllowed !== null) { searchCriteria.petsAllowed = (searchQuery.petsAllowed === "true"); }
    if(searchQuery.parkingAvailable !== null) { searchCriteria.parkingAvailable = (searchQuery.parkingAvailable === "true"); }

  }


  RoomListing.findAll({
    where: searchCriteria,
    order: [ sortAttrs ],
    attributes: roomAttributes,
    include:
      [ {model: Property,  attributes: propertyAttributes, as: 'relatedPropertyId'}],
          limit:100,
          order: '"monthlyPrice"'})
    .then(function(roomListings) {

    roomListings.forEach(function(e, i, a) {
      var roomDetails = e.dataValues;
      var propertyDetails = e.relatedPropertyId.dataValues;
      propertyDetails.coords = {};
      propertyDetails.coords.latitude =   e.relatedPropertyId.dataValues.latitude;
      propertyDetails.coords.longitude =   e.relatedPropertyId.dataValues.longitude;
      delete  propertyDetails.latitude;
      delete propertyDetails.longitude;


      var mashed = _.extend({}, { roomDetails: roomDetails }, { propertyDetails: propertyDetails } );
      delete mashed.roomDetails.relatedPropertyId;
      roomListingsResponse.push(mashed);
    });

   // console.log('Room Listings: ', roomListingResponse);

    res.json(excludeService.excludeOwn(roomListingsResponse, req.user.id));
  });
};








