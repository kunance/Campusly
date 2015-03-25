'use strict';

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function(User, config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    //extending callback (adding request as first parameter witch is not default)
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    var userId = req.session.passport.user.id;
    User.findOne({
      where: {
        id: userId
      }
    })
      .then(function (user) {
        if(user){
          //saving his facebbok email address, in case we need it later
          user.facebookOAuthId = profile.emails[0].value;
          user.facebook = profile.profileUrl;
          //if user didnt input anything about him, it will be fetched from fb profile
          user.aboutMe = user.aboutMe || profile._json.bio;
          user.save().then(function (updated) {
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
