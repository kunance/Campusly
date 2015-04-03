var sqldb = require('../../../sqldb');
var User = sqldb.model('rentedUser');
var RoomListing = sqldb.model('roomListing');
var config = require('../../../config/environment');
var Looking = sqldb.model('looking');
var mandrill = require('node-mandrill')(config.mandrill.APIkey);

module.exports.UserEvery24h = function (req, res, next) {
  setInterval(function () {
    var lookingCount = 0;
    var roomListingCount = 0;
    var recipients = null;

    recipients = {
      message: {
        from_email: config.mail.from_email,
        from_name: config.mail.from_name,
        "to":[],
        subject: 'update'
      }
    };

    var d = new Date(); // today!
    var x = 1; // go back 5 days!
    d.setDate(d.getDate() - x);

    User.findAll({})
      .then(function (users) {
        for (var i = 0; i < 2; i += 1) {
          recipients.message.to.push({email: users[i].email, name: users[i].firstname+' '+users[i].lastname, type: 'to'})
        }
      Looking.findAll({where:
      {
        createdAt: {gte: d}
      }})
        .then(function (lookings) {
          lookingCount = lookings.length;
          RoomListing.findAll({where:
          {
            createdAt: {gte: d}
          }})
            .then(function (roomListings) {
              roomListingCount = roomListings.length;
              recipients.message.text = "Hello, today is published " + roomListingCount + " new rooms, and " + lookingCount + " posted looking. More info on http://www.campusly.org";
              if(roomListingCount>0 || lookingCount>0) {
                mandrill('/messages/send', recipients, function (error, info) {
                  if (error) {
                    console.log(error);
                  }
                  else {
                    console.log(info);
                  }
                });
              } else {
                console.log('nothing new');
              }
            })
            .catch(function (errors) {
              console.log(errors);
              res.status(500).json(errors);
            });
          })
          .catch(function (errors) {
            console.log(errors);
            res.status(500).json(errors);
          });
        })
        .catch(function (errors) {
          console.log(errors);
          res.status(500).json(errors);
        });
     }, 20000);

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
