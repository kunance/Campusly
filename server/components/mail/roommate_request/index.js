'use strict';

var mandrill = require('../../mail/mail.service');
var config = require('../../../config/environment');

var sendMail = function(sender, roommate, callback){
  if(config.env=='development') {
    var locals = {
      name: sender.firstname+" "+sender.lastname,
      COMPANY: 'Campusly',
      roommate:roommate.firstname+' '+roommate.lastname
    };
  }
  if(config.env=='production') {
    var locals = {
      name: sender.firstname+" "+sender.lastname,
      COMPANY: 'Campusly',
      roommate:roommate.firstname+' '+roommate.lastname
    };
  }

  mandrill.roommateRequest('roommate_request', roommate, 'Campusly - Roommate request', locals, callback);
};


exports.sendMail = sendMail;
