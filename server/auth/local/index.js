'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var controller = require('./local.controller');

var router = express.Router();

router.get('/mailconfirmation/:userId', controller.sendMailAddressConfirmationMail);
router.post('/mailconfirmation', controller.confirmMailAddress);
router.post('/sendingPWDresetMail', controller.resetPassword);
router.post('/passwordreset', controller.confirmResetedPassword);
router.post('/', controller.root);

module.exports = router;
