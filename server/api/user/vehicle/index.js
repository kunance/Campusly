'use strict';

var express = require('express');
var controller = require('./vehicle.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.newVehicle);
router.get('/all', auth.isAuthenticated(), controller.showVehicles);
router.get('/:id', auth.isAuthenticated(), controller.getVehicle);
router.put('/:id', auth.isAuthenticated(), controller.saveVehicle);
router.delete('/:id', auth.isAuthenticated(), controller.deleteVehicle);

module.exports = router;
