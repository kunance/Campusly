'use strict';

var mandrill = require('../../mail/mail.service');
var config = require('../../../config/environment');

var sendMail = function(user, mailConfirmationToken, callback){
  if(config.env=='production') {
  var locals = {
    name:user.firstname,
    COMPANY: 'Campusly',
    CONFIRMATION_URL :'https://' + (config.ip || 'localhost:9000') + '/loginVerify/' ,
    MAIL_CONFIRMATION_TOKEN : mailConfirmationToken
  };
  }
  if(config.env=='development') {
    var locals = {
      name:user.firstname,
      COMPANY: 'Campusly',
      CONFIRMATION_URL :'http://' + (config.ip || 'localhost:9000') + '/loginVerify/' ,
      MAIL_CONFIRMATION_TOKEN : mailConfirmationToken
    };
  }

  mandrill.confirm('mail_confirmation', user, 'Campusly - Account Activation', locals, callback);

};

exports.sendMail = sendMail;


