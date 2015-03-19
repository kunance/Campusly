'use strict';

var mandrill = require('../../mail/mail.service');
var config = require('../../../config/environment');
//var service = require('./../mail.service.js');

var sendMail = function(user, passwordResetToken, callback){

  var locals = {
    name: user.firstname,
    COMPANY: 'Campusly',
    PWDRESET_URL : 'https://' + (config.ip || 'localhost:9000') + '/loginPwdReset/' ,
    PWDRESETTOKEN : passwordResetToken
  };

  mandrill.passwordReset('password_reset', user, 'Password reset', locals, callback);
};


exports.sendMail = sendMail;
