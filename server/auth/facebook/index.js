'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    successRedirect: 'myProfile',
    failureRedirect: '/',
    session: true
  }))

  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/',
    successRedirect: '/myProfile',
    session: true
  }), auth.setTokenCookie);

module.exports = router;
