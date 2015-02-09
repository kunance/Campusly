var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mandrill = require('../../components/mandrill');

exports.setup = function(User, config) {
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.find({where: {
      'googleOAuthId': profile.id
    }})
      .then(function(user) {
        if (!user) {
          user = User.build({
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            password:'password',
            runIdentityCheck:false,
            shareCreditReport:false,
            createdAt: new Date(),
            email: profile.emails[0].value,
            role: 'user',
            username:  profile.displayName,
            provider: profile.provider,
            googleOAuthId:profile.id
          });
          user.save()
            .then(function(user) {
              mandrill.welcome(user);
              return done(null, user);
            })
            .catch(function(err) {
              return done(err);
            });
        } else {
          return done(null, user);
        }
      })
      .catch(function(err) {
        return done(err);
      });
  }));
};
