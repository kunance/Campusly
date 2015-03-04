'use strict';

var express = require('express');
var controller = require('./looking.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.newLooking);
router.get('/all', auth.isAuthenticated(), controller.showLookings);
router.get('/:id', auth.isAuthenticated(), controller.getLooking);
router.put('/:id', auth.isAuthenticated(), controller.saveLooking);
router.delete('/:id', auth.isAuthenticated(), controller.deleteLooking);


module.exports = router;
