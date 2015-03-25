'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var controller = require('./local.controller');

var router = express.Router();

router.get('/mailconfirmation/:userId', controller.sendMailAddressConfirmationMail);
router.post('/mailconfirmation', controller.confirmMailAddress);
router.get('/passwordreset', controller.resetPassword);
router.post('/passwordreset', controller.confirmResetedPassword);
router.post('/', passport.authenticate('local', {session:true}), controller.root);

module.exports = router;
