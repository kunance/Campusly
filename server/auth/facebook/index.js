'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me', 'user_education_history', 'user_friends', 'user_birthday', 'user_hometown', 'user_interests', 'user_location'],
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
