'use strict';

var express = require('express');
var controller = require('./looking.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/all', controller.showAllLookings);
router.get('/:id', controller.showSingleLooking);

module.exports = router;
