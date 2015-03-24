'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
//  .use(function(req, res, next) {
//  req.userId = req.query.id;
//  next();
//})
  .get('/', passport.authorize('facebook', {
    scope: ['email', 'user_about_me', 'user_education_history'],
    successRedirect: 'myProfile',
    failureRedirect: '/',
    session: false
  }))

  //.get('/callback', passport.authorize('facebook', {
  //  failureRedirect: '/',
  //  successRedirect: '/myProfile',
  //  session: false
  //}),/* auth.setTokenCookie*/ function(req,res) {
  //  console.log('bla', req.query);});

.get('/callback',
  passport.authorize('facebook', {failureRedirect: '/'}),
/* auth.setTokenCookie*/ function(req,res) {
  console.log('bla', req.account);}
);

module.exports = router;
