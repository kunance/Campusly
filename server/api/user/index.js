'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/',/* auth.hasRole('admin'),*/ controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/info', auth.isAuthenticated(), controller.changeInfo);
router.post('/:id/profileImages', auth.isAuthenticated(), controller.changeProfileImage);
router.get('/:id/profileImage',/* auth.isAuthenticated(), */controller.downloadProfileImage);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

router.get('/:id/currentAddressAndUniv', auth.isAuthenticated(), controller.currentAddressAndUniv);

module.exports = router;
