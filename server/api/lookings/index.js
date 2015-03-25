'use strict';

var express = require('express');
var controller = require('./looking.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.showAllLookings);
router.get('/:id', auth.isAuthenticated(), controller.showSingleLooking);

module.exports = router;
