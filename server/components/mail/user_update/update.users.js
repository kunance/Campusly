'use strict';

var mail = require('../../mail');
var sqldb = require('../../../sqldb');
var User = sqldb.model('rentedUser');
var RoomListing = sqldb.model('roomListing');
var Looking = sqldb.model('looking');
var schedule = require('node-schedule');
var Education = sqldb.model('userEducation');
/*
 * option: j.cancel();
 * starts: [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK] [YEAR (optional)]
 */
var updateUsers = function (req, res, next) {

  //send every day update at 17:01 hours (US 08:01) morning
  var j = schedule.scheduleJob('1 17 * * *', function(){
    mail.userUpdate.sendMail(User, RoomListing, Looking, Education, function (err, resp) {
      if (err) {
        console.log('error: ',err);
        j.cancel();
      }
      else console.log(resp);
    });
  });
};

exports.updateUsers = updateUsers;
