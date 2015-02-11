'use strict';

var express = require('express');
var controller = require('./vehicle.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.newVehicle);


module.exports = router;
