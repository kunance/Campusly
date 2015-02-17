'use strict';

// ********************* Mail ***********************
var passport = require('passport');
var jwt = require('jsonwebtoken');
var mail = require('../../components/mail');
var config = require('../../config/environment');
var sqldb = require('../../sqldb');
var User = sqldb.model('rented.rentedUser');
var auth = require('../auth.service');
// ********************* Mail ***********************

exports.root = function(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);
    if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

    var token = auth.signToken(user.id, user.role);
    res.json({token: token});

  })(req, res, next)
};


/**
 * Send confirmation mail
 */
exports.sendMailAddressConfirmationMail = function(req, res, next) {
  var userId = req.user.id;
  User.find({where:{id: userId}}, '-salt -hashedPassword')
    .then(function (user) {
      var mailConfirmationToken =  jwt.sign({user : user.id, email : user.email}, config.secrets.mailConfirmation, {expiresInMinutes: 1});
      mail.mailConfirmation.sendMail(user, mailConfirmationToken, function(err,resp){
        if(err) res.send(403);
        else res.send(200);});
    })
    .catch(function (error) {
      if (error) return next(error);
      if (!user) return res.json(401);
    })
};


/**
 * Confirm mail address
 */
exports.confirmMailAddress = function(req, res, next) {
  var mailConfirmationToken = req.param('mailConfirmationToken');

  jwt.verify(mailConfirmationToken, config.secrets.mailConfirmation, function(error, data) {

    if (error) return res.send(403);

    if (data.exp < Date.now()) return res.send(403, {message: "The validation token has expired. You should sign in and ask for a new one."});
    User.find({where: {id: data.user}})
      .then(function (user) {
        user.confirmMail(function () {
          res.json({token: auth.signToken(user.id)});
        })
      })
      .catch(function (error) {
        if (error) return res.send(403, {message: "The validation token is invalid. You should sign in and ask for a new one."});
        if (!user) return res.send(403, {message: "The validation token is invalid. You should sign in and ask for a new one."});
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
      var passwordResetToken = jwt.sign({userId: user.id, newPassword : newPassword}, config.secrets.passwordReset, {expiresInMinutes: 60 * 24});
      mail.passwordReset.sendMail(user, passwordResetToken, function(err,resp){if(err) res.send(403); else res.send(200);});
    })
    .catch(function (err) {
      if (error)
        if (error) return next(error);
      if (!user) return res.send(403, { message: 'This email address is unknown' });
    });
};

/**
 * Reset and change password
 */
exports.confirmResetedPassword = function(req, res, next) {

  var passwordResetToken = String(req.body.passwordResetToken);

  jwt.verify(passwordResetToken, config.secrets.passwordReset, function(error, data) {

    if (error) return res.send(403);

    User.find({where: {id:data.userId}})
      .then(function (user) {
        user.password = data.newPassword;
        user.save(function(error) {
          if (error) return res.send(403);
          res.json({ token: auth.signToken(user.id) });
        });
      })
      .catch(function (err) {
        if (err) return res.send(403);
      })
      });
};
