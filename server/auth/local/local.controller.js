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

exports.root = function(req, res, next) {

  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.status(401).send(error);
    if (!user) return res.status(404).send({message: 'Something went wrong, please try again.'});
    var token = auth.signToken(user.id, user.role);

    //passing token + passport session used by facebook OAuth
    req.logIn(user, function(err) {
      if (err) { return next(err); }
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
  User.find({where:{email: id}}, '-salt -hashedPassword')
    .then(function (user) {
      if(!user){
        return res.status(404).send({message: 'Something went wrong, please try again.'})
      } else {
        var mailConfirmationToken = jwt.sign({user: user.id, email: user.email}, config.secrets.mailConfirmation, {expiresInMinutes: 60});
        mail.mailConfirmation.sendMail(user, mailConfirmationToken, function (err, resp) {
          if (!user) return res.status(401).end();
          if (err) res.status(403).end();
          else res.status(200).end();
        })
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

    if (error) return res.status(403).end();

    if (data.exp < Date.now()) return res.status(403).send({message: "The validation token has expired. You should sign in and ask for a new one."});
    User.find({where: {id: data.user}})
      .then(function (user) {
        if (!user) return res.status(403).send({message: "The validation token is invalid. You should sign in and ask for a new one."});
        user.confirmMail(function () {
          res.json({token: auth.signToken(user.id)});
        })
      })
      .catch(function (error) {
        if (error) return res.status(403).send({message: "The validation token is invalid. You should sign in and ask for a new one."});
      });
  })
};

/**
 * Send password reset mail
 */
exports.resetPassword = function(req, res, next) {
  var email = String(req.query.email);
  var newPassword = String(req.query.newPassword);
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
