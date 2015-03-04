var sqldb = require('../../sqldb');
var RoomListing = sqldb.model('roomListingView');




/**
 * Retrieve a specific room listing with both the room listing and property details
 * @param req
 * @param res
 * @param next
 */
exports.getRoomListing = function(req, res, next) {

  RoomListing.findAll();
  
  res.json(
      {
        "image_url": "http://lorempixel.com/400/250/city/1",
        "value": 818,
        "distance": "414.8 miles",
        "kind": "Single",
        "roommates": 1,
        "bathroom": "Shared",
        "availability_date": "2003-09-24"
      });

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

  res.json(
    [
      {
        "image_url": "http://lorempixel.com/400/250/city/1",
        "value": 818,
        "distance": "414.8 miles",
        "kind": "Single",
        "roommates": 1,
        "bathroom": "Shared",
        "availability_date": "2003-09-24"
      },
      {
        "image_url": "http://lorempixel.com/400/250/city/2",
        "value": 976,
        "distance": "158.2 miles",
        "kind": "Double",
        "roommates": 2,
        "bathroom": "Private",
        "availability_date": "1985-12-10"
      },
      {
        "image_url": "http://lorempixel.com/400/250/city/3",
        "value": 430,
        "distance": "314.5 miles",
        "kind": "Single",
        "roommates": 4,
        "bathroom": "Private",
        "availability_date": "1993-03-25"
      },
      {
        "image_url": "http://lorempixel.com/400/250/city/4",
        "value": 390,
        "distance": "82.1 miles",
        "kind": "Single",
        "roommates": 1,
        "bathroom": "Shared",
        "availability_date": "2006-08-26"
      },
      {
        "image_url": "http://lorempixel.com/400/250/city/5",
        "value": 170,
        "distance": "102.4 miles",
        "kind": "Double",
        "roommates": 2,
        "bathroom": "Shared",
        "availability_date": "1980-09-08"
      },
      {
        "image_url": "http://lorempixel.com/400/250/city/6",
        "value": 393,
        "distance": "358.7 miles",
        "kind": "Single",
        "roommates": 4,
        "bathroom": "Shared",
        "availability_date": "2001-10-01"
      },
      {
        "image_url": "http://lorempixel.com/400/250/city/7",
        "value": 338,
        "distance": "177.3 miles",
        "kind": "Double",
        "roommates": 1,
        "bathroom": "Shared",
        "availability_date": "1974-05-14"
      },
      {
        "image_url": "http://lorempixel.com/400/250/city/8",
        "value": 970,
        "distance": "163 miles",
        "kind": "Double",
        "roommates": 4,
        "bathroom": "Private",
        "availability_date": "2005-03-23"
      },
      {
        "image_url": "http://lorempixel.com/400/250/city/9",
        "value": 163,
        "distance": "216.1 miles",
        "kind": "Single",
        "roommates": 4,
        "bathroom": "Private",
        "availability_date": "1991-06-02"
      },
      {
        "image_url": "http://lorempixel.com/400/250/city/10",
        "value": 488,
        "distance": "89.1 miles",
        "kind": "Single",
        "roommates": 4,
        "bathroom": "Shared",
        "availability_date": "2008-07-14"
      }
    ]
  );

};








