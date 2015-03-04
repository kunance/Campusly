'use strict';

var express = require('express');
var controller = require('./room.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();



/**
 *  Gets all My rooms fully hydrated
 *  Use param  min=true for room with only
 *
 */
router.get('/', controller.getAllRoomListings);


router.get('/:id', controller.getRoomListing);


/**
 * @see payload required in controller
 */
router.post('/', controller.createRoomListing);


/**
 * url looks like /api/users/:userId/rooms/:id
 */
router.put('/:id', controller.editRoomListing);


/**
 * url looks like /api/users/:userId/rooms/:id
 */
//router.delete(':userId', '/:id');
router.delete('/:id', controller.deleteRoomListing);



module.exports = router;

