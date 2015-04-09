'use strict';

// ********************* Mail ***********************
var passport = require('passport');
var jwt = require('jsonwebtoken');
var mail = require('../../components/mail');
var config = require('../../config/environment');
var sqldb = require('../../sqldb');
var User = sqldb.model('rentedUser');
var Education = sqldb.model('userEducation');
var University = sqldb.model('university');
var auth = require('../auth.service');
// ********************* Mail ***********************

function adoptTimestampForValidation(inputDate) {
  return Math.floor(inputDate / 1000)
}

exports.root = function(req, res, next) {

  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.status(401).send(error);
    if (!user) return res.status(404).send({message: 'Something went wrong, please try again.'});
    var token = auth.signToken(user.id, user.role);

    //passing token + passport session used by facebook OAuth
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
       res.json({passport:user, token: token});
    });

    //res.json({token: token});

  })(req, res, next)
};


/**
 * Send confirmation mail
 */
exports.sendMailAddressConfirmationMail = function(req, res, next) {
  var id = req.params.userId;
  User.find({where:{
      email: id
    }
  },
    '-salt -hashedPassword'
  )
    .then(function (user) {
      if(!user){
        return res.status(404).send({message: 'Something went wrong, please try again.'})
      } else {
          var mailConfirmationToken = jwt.sign(
            {user: user.id, email: user.email},
            config.secrets.mailConfirmation
         /*   ,{expiresInMinutes: 60} removing expiration, we handle it in db*/
          );
        user.setVerificationData(mailConfirmationToken, function () {
          mail.mailConfirmation.sendMail(user, mailConfirmationToken, function (err, resp) {
            if (!user) return res.status(401).end();
            if (err) {
              console.log(err);
              res.status(403).end();
            }
            else res.status(200).end();
          })
        });
      }
    })
    .catch(function (error) {
      if (error) return next(error);
    })
};

/**
 * Confirm mail address
 */
exports.confirmMailAddress = function(req, res, next) {
  var mailConfirmationToken = req.param('mailConfirmationToken');
  jwt.verify(mailConfirmationToken, config.secrets.mailConfirmation, function(error, data) {
    if (error){
      //invalid token case 1
      return res.status(403).send({reason:'incorrect', title:"Sorry, the email validation failed! :(", content:" Please re-type your e-mail and click resend."});
    }
    else {
      User.find({where: {
        id: data.user
      }})
        .then(function (user) {
          if (!user) {
            //invalid token case 2
            return res.status(403).send({reason:'incorrect', title: user.firstname + ", sorry, the email validation failed! :(", content:" Please re-type your e-mail and click resend."});
          }
          if(!user.confirmedEmail) {
            if( String(mailConfirmationToken)!= String(user.googleOAuthId)) res.status(403).send({reason:'un-match', title: "DB and JWT tokens don't match."});
            if (Date.now() < user.updatedAt) {
              user.confirmMail(function () {
                res.json({token: auth.signToken(user.id), title: user.firstname + ', thank you for confirming your email.', content:'Please sign in to continue'});
              })
            } else {
              //expired token case 1
              return res.status(403).send({reason: 'expired', title: user.firstname + ", the validation time has expired.", content: " Please re-type your e-mail and click resend."});
            }
          } else {
              res.json({token: auth.signToken(user.id), title: user.firstname + ', your account is already confirmed', content: 'Please sign in to continue !'});
          }
        })
        .catch(function (error) {
          //general error case (it should trigger in any case, because we handled both possible cases above
          if (error) return res.status(403).send({message: "something went wrong."});
        });

    }
  })
};

/**
 * Send password reset mail
 */
exports.resetPassword = function(req, res, next) {
  var email = String(req.body.email);
  var newPassword = String(req.body.newPassword);

  User.find({where:{email: email}})
    .then(function (user) {
      if (!user) return res.status(403).send({message: 'This email address is unknown' });
      var passwordResetToken = jwt.sign({userId: user.id, newPassword : newPassword}, config.secrets.passwordReset, {expiresInMinutes: 60 * 24});
      mail.passwordReset.sendMail(user, passwordResetToken, function(err,resp){if(err) res.status(403).end(); else res.status(200).end();});
    })
    .catch(function (err) {
      if (err)
        if (err) return next(err);
      if (!user) return res.status(403).send({message: 'This email address is unknown' });
    });
};

/**
 * Reset and change password
 */
exports.confirmResetedPassword = function(req, res, next) {

  var passwordResetToken = String(req.body.passwordResetToken);

  jwt.verify(passwordResetToken, config.secrets.passwordReset, function(error, data) {

    if (error) return res.status(403).end();

    User.find({where: {id:data.userId}})
      .then(function (user) {
        user.password = data.newPassword;
        user.save(function(error) {
          if (error) return res.status(403).end();
          res.json({ token: auth.signToken(user.id) });
        });
      })
      .catch(function (err) {
        if (err) return res.status(403).end();
      })
      });
};
