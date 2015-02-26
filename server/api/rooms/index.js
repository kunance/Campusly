'use strict';

var express = require('express');
var controller = require('./rooms.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();


/**
 *  Gets all rooms fully hydrated
 *  Use param:
 *     min=true for room with only
 *
 *     If you use distance, you MUST pass in lat, long     supports current location using mobile, your university, your current home address, your gf/bf address
 *     lat=8.3
 *     long=8.2
 *     distance=whole number in miles
 *
 *
 *  Coming soon more url params to support criteria for search
 *
 */
router.get('/', controller.getAllRooms);



// gets room with specific :id
router.get('/:id', controller.getRoom);


module.exports = router;
