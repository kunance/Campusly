'use strict';

var express = require('express');
var controller = require('./education.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.newEducation);
router.get('/all', auth.isAuthenticated(), controller.showEducations);


module.exports = router;
