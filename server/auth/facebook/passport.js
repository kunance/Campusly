'use strict';

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function(User, config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    console.log('UNUTRA SAN', req);
  //  console.log('UNUTRA SAN', req.query);
    User.findOne({
      where: {
        id: global.userId
      }
    })
      .then(function (user) {
        if(user){
          user.facebook = profile.profileUrl;
          user.save().then(function (updated) {
            global.userId = user.id;
            return done(null, updated);
          })
            .catch(function(err) {
              return done(err);
            });
        } else {
          return done(null, user);
        }})
      .catch(function(err) {
        return done(err);
      });
    }))
};
