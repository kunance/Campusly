'use strict';

var express = require('express');
var controller = require('./rooms.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();



/**
 *  Gets all My rooms fully hydrated
 *  Use param  min=true for room with only
 *
 */
router.get('/', controller.getAllRooms);


/**
 * @see payload required in controller
 */
router.post('/', controller.createRoom);


/**
 * url looks like /api/users/:userId/rooms/:id
 */
router.put('/:id');


/**
 * url looks like /api/users/:userId/rooms/:id
 */
//router.delete(':userId', '/:id');
router.delete('/:id', controller.deleteRoom);



module.exports = router;

