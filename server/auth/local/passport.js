var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function localAuthenticate(User, email, password, done) {
  var finalEmail = email.toLowerCase();
  console.log(finalEmail);
  User.findOne({
    where: {
      email: finalEmail
    }
  })
    .then(function(user) {
      if (!user) {
        return done(null, false, {
          message: {mail:'This email is not registered.'}
        });
      }
      user.authenticate(password, function(authError, authenticated) {
        if (authError) {
          return done(authError);
        }
        if (!authenticated) {
          return done(null, false, {
            message: {password: 'This password is not correct.'}
          });
        } else {
          return done(null, user);
        }
      });
    })
    .catch(function(err) {
      return done(err);
    });
}

exports.setup = function(User, config) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function(email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
};
