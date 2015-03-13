'use strict';

var express = require('express');
var controller = require('./address.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.newAddress);
router.get('/all', auth.isAuthenticated(), controller.showAddresses);
router.get('/:id', auth.isAuthenticated(), controller.getAddress);
router.put('/:id', auth.isAuthenticated(), controller.saveAddress);
router.delete('/:id',/* auth.isCurrentUser(),*/ controller.deleteAddress);

module.exports = router;
