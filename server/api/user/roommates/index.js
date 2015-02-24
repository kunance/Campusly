'use strict';

var express = require('express');
var controller = require('./roommate.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/:id', auth.isAuthenticated(), controller.newRoommate);
router.get('/all', auth.isAuthenticated(), controller.showRoommates);
router.get('/:id', auth.isAuthenticated(), controller.getRoommate);
router.put('/:id', auth.isAuthenticated(), controller.saveRoommate);
router.delete('/:id', auth.isAuthenticated(), controller.deleteRoommate);

module.exports = router;

