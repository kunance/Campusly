'use strict';

var express = require('express');
var controller = require('./status.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.newStatus);
router.put('/:id', auth.isAuthenticated(), controller.updateStatus);
router.get('/', auth.isAuthenticated(), controller.getStatus);

module.exports = router;
