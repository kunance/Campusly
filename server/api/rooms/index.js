'use strict';

var express = require('express');
var controller = require('./rooms.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();


/**
 *  @see documentation in the rooms controller
 *
 */
router.get('/', controller.getAllRoomListings);


/**
 *  @see documentation in the rooms controller
 */
router.get('/:id', controller.getRoomListing);



module.exports = router;
