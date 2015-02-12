'use strict';

var express = require('express');
var controller = require('./address.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.newAddress);


module.exports = router;
