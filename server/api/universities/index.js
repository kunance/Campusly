'use strict';

var express = require('express');
var controller = require('./universities.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/all', controller.showAllUniversities);

module.exports = router;
