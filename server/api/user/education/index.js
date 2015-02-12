'use strict';

var express = require('express');
var controller = require('./education.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.newEducation);
router.get('/all', auth.isAuthenticated(), controller.showEducations);
router.get('/:id', auth.isAuthenticated(), controller.getEducation);
router.put('/:id', auth.isAuthenticated(), controller.saveEducation);
router.delete('/:id', auth.isAuthenticated(), controller.deleteEducation);


module.exports = router;
