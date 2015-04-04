var sqldb = require('../../../sqldb');
var User = sqldb.model('rentedUser');
var RoomListing = sqldb.model('roomListing');
var config = require('../../../config/environment');
var Looking = sqldb.model('looking');
var mandrill = require('node-mandrill')(config.mandrill.APIkey);
var schedule = require('node-schedule');

module.exports.UserEvery24h = function (req, res, next) {

/*
 * option: j.cancel();
 * starts: [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK] [YEAR (optional)]
 */

  //var j = schedule.scheduleJob('4 00 * * *', function(){
  //
  //  var lookingCount = 0;
  //  var roomListingCount = 0;
  //  var recipients = null;
  //  var d = new Date();
  //
  //  recipients = {
  //    message: {
  //      from_email: config.mail.from_email,
  //      from_name: config.mail.from_name,
  //      "to":[],
  //      subject: 'update'
  //    }
  //  };
  //
  //  User.findAll({})
  //    .then(function (users) {
  //      if(users) {
  //        for (var i = 0; i < 2; i += 1) {
  //          recipients.message.to.push({
  //            email: users[i].email,
  //            name: users[i].firstname + ' ' + users[i].lastname,
  //            type: 'to'
  //          })
  //        }
  //      } else {
  //        console.log('canceled');
  //        j.cancel();
  //      }
  //    Looking.findAll({where:
  //    {
  //      createdAt: {gte: d}
  //    }})
  //      .then(function (lookings) {
  //        lookingCount = lookings.length;
  //        RoomListing.findAll({where:
  //        {
  //          createdAt: {gte: d}
  //        }})
  //          .then(function (roomListings) {
  //            roomListingCount = roomListings.length;
  //
  //            if(roomListingCount>0 || lookingCount>0) {
  //              recipients.message.text = "Hello, today is published " + roomListingCount + " new rooms, and " + lookingCount + " posted looking. More info on http://www.campusly.org";
  //              mandrill('/messages/send', recipients, function (error, info) {
  //                if (error) {
  //                  console.log(error);
  //                }
  //                else {
  //                  console.log(info);
  //                }
  //              });
  //            } else {
  //              console.log('canceled');
  //              j.cancel();
  //            }
  //          })
  //          .catch(function (errors) {
  //            console.log(errors);
  //            res.status(500).json(errors);
  //          });
  //        })
  //        .catch(function (errors) {
  //          console.log(errors);
  //          res.status(500).json(errors);
  //        });
  //      })
  //      .catch(function (errors) {
  //        console.log(errors);
  //        res.status(500).json(errors);
  //      });
  //});

};

//"to":[
//  {
//    "email":"recipient.email@example.com",
//    "name":"Recipient Name",
//    "type":"to"
//  },
//  {
//    "email":"bcc.recipient.email.1@example.com",
//    "name":"BCC Recipient Name 1",
//    "type":"bcc"
//  },
//  {
//    "email":"bcc.recipient.email.2@example.com",
//    "name":"BCC Recipient Name 2",
//    "type":"bcc"
//  }
//]
