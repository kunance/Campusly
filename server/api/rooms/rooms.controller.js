var sqldb = require('../../sqldb');
var RoomListing = sqldb.model('roomListingView');




/**
 * Retrieve a specific room listing with both the room listing and property details
 * @param req
 * @param res
 * @param next
 */
exports.getRoomListing = function(req, res, next) {


};


/**
 *  Gets all room listings with room listing and property details.  Default behavior is to return fully hydrated
 *  models unless a filter is used in the query.
 *
 *  Use param  min=true to return room listings with the following fields
 *  {
 *  image_url:
 *  "value": 818,
    "distance": this is distance to university (//TODO which university ???)
    "kind": 'single' | 'double' | 'living room'
    "num_roomates":
    "bathroom": "Shared",
    "availability_date": "2003-09-24"
    }


 Coming soon more url params to support criteria for search


 *     If you use distance, you MUST pass in latitude and longitude
 *     lat=8.3
 *     long=8.2
 *     distance=whole number in miles
 *
 *     Passing in lat, long to the api supports current location using mobile, your university, your current
 *         home address, your gf/bf address, ...
 *
 *
 *
 * @param req
 * @param res
 * @param next
 */
exports.getAllRoomListings = function(req, res, next) {


};








