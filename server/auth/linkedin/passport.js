var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;

exports.setup = function(User, config) {
  passport.use(new LinkedInStrategy({
      consumerKey: config.linkedin.consumerKey,
      consumerSecret: config.linkedin.consumerSecret,
      callbackURL: config.linkedin.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.find({where: {
        'linkedinOAuthId': profile.id
      }})
        .then(function(user) {
          if (!user) {
            user = User.build({
              firstname: profile.name.givenName,
              lastname: profile.name.familyName,
              middlename: profile.name.middleName,
              password:'password',
              runIdentityCheck:false,
              shareCreditReport:false,
              createdAt: new Date(),
              email: profile.emails[0].value,
              role: 'user',
              username:  profile.displayName,
              provider: 'facebook',
              consumerSecretOAuthId:profile.id
            });
            user.save()
              .then(function(user) {
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
