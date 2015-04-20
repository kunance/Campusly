'use strict';

var config = require('../../../config/environment');
var mailService = require('../../mail/mail.service');
var _ = require('lodash');
var sqldb = require('../../../sqldb');
var Property = sqldb.model('property');
var University = sqldb.model('university');

var sendMail = function(User, RoomListing, Looking, Education, callback){
  var current = new Date();
  var minus24hours = new Date(current);
  minus24hours.setDate(current.getDate()-1);

  var locals = {
  lookings : 0,
  roomListings : 0,
  recipients : [],
  d : minus24hours
  };

  locals.recipients = {
    message: {
      from_email: config.mail.from_email,
      from_name: config.mail.from_name,
      "to":[],
      subject: 'New Available Rooms & Students Looking For You!'
    }
  };
  User.findAll({where:
  {
    shareCreditReport:true,
    confirmedEmail:true
  }})
    .then(function (users) {
      if(users) {
        //for (var i = 0; i < users.length; i += 1) {
        //  locals.recipients.message.to.push({
        //    email: users[i].email,
        //    name: users[i].firstname + ' ' + users[i].lastname,
        //    type: 'to'
        //  })
        //}
        for (var i = 0; i < 1; i += 1) {
          locals.recipients.message.to.push({
            email: 'ivan@campusly.org',
            name: users[i].firstname + ' ' + users[i].lastname,
            type: 'to'
          })
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
