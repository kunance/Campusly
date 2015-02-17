'use strict';

var express = require('express');
var controller = require('./occupation.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.newOccupation);
router.get('/all', auth.isAuthenticated(), controller.showOccupations);
router.get('/:id', auth.isAuthenticated(), controller.getOccupation);
router.put('/:id', auth.isAuthenticated(), controller.saveOccupation);
router.delete('/:id', auth.isAuthenticated(), controller.deleteOccupation);


module.exports = router;
