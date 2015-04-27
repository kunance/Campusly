'use strict';

var config = require('../../../config/environment');
var mailService = require('../../mail/mail.service');
var _ = require('lodash');
var sqldb = require('../../../sqldb');
var Property = sqldb.model('property');
var University = sqldb.model('university');
var jwt = require('jsonwebtoken');

var sendMail = function(User, RoomListing, Looking, Education, callback){
  var current = new Date();
  var minus24hours = new Date(current);
  minus24hours.setDate(current.getDate()-1);

  var locals = {
  lookings : 0,
  roomListings : 0,
  recipients : [],
  d : minus24hours,
  UNSUBSCRIBE_URL:''
  };

  if(config.env=='development' || config.env=='test') {
    locals.UNSUBSCRIBE_URL= 'http://localhost:9000/unsubscribe/';
  }
  if(config.env=='production') {
    locals.UNSUBSCRIBE_URL= 'https://campusly.org/unsubscribe/';
  }

  locals.recipients = {
    message: {
      from_email: config.mail.from_email,
      from_name: config.mail.from_name,
      "to":[],
      subject: 'New Available Rooms & Students Looking For You!'
    }
  };
  locals.recipients.message.merge_vars = [];
  User.findAll({where:
  {
    shareCreditReport:true,
    confirmedEmail:true
  }})
    .then(function (users) {
      if(users) {
        for (var i = 0; i < users.length; i += 1) {
          var unsubscribeToken = jwt.sign({user: users[i].id, email: users[i].email}, config.secrets.mailConfirmation);
          // keep DB out for now and see how it behaves
          //users[i].setVerificationData(unsubscribeToken, function () {
          //});
          locals.recipients.message.to.push({
            email: users[i].email,
            name: users[i].firstname + ' ' + users[i].lastname,
            type: 'to'
          });
          locals.recipients.message.merge_vars.push( {
                rcpt: users[i].email,
                vars: [
                  {
                    "name": "token",
                    "content": unsubscribeToken
                  }
                ]
              }
          )

        }
      } else {
        console.log('no users');
      }
      Looking.findAll({where:
      {
        activeLooking:true,
        createdAt: {gte: locals.d}
      },
        include: [
          { model: User, as: 'relatedUserId',
            include:[
              { model: Education, as: 'usereducationUsers',
                include:[
                  { model: University, as: 'relatedUniversityId'}
                ]}
            ]}
        ]
      })
        .then(function (lookings) {
          if(lookings)
            locals.lookings = lookings;
          RoomListing.findAll({where:
          {
            activeRoom:true,
            createdAt: {gte: locals.d}
          },
            include: [
              {model: Property, as: 'relatedPropertyId'}
            ]
        })
            .then(function (roomListings) {
              if(roomListings) {
                locals.roomListings = roomListings;
              }
              if(locals.lookings.length>0 || locals.roomListings.length>0) {
                mailService.updateUsers('user_update', null, 'Campusly - daily update', locals, callback);
              } else {
                console.log('canceled');
              }
            })
            .catch(function (errors) {
              console.log(errors);
            });
        })
        .catch(function (errors) {
          console.log(errors);
        });
    })
    .catch(function (errors) {
      console.log(errors);
    });
};

exports.sendMail = sendMail;
