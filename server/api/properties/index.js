'use strict';

var express = require('express');
var controller = require('./properties.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

//router.get('/', controller.index);
//router.delete('/:id', controller.destroy);
//router.get('/me', controller.me);
//router.put('/:id/password', controller.changePassword);
//router.put('/:id/info', controller.changeInfo);
router.get('/all', auth.isAuthenticated(), controller.showAllProperties);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.createProperty);

module.exports = router;
