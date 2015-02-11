'use strict';

var express = require('express');
var controller = require('./pet.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.newPet);

module.exports = router;

