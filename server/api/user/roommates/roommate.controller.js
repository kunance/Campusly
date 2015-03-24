'use strict';

var _ = require('lodash');
var sqldb = require('../../../sqldb');
var User = sqldb.model('rentedUser');
var Roommate = sqldb.model('roommate');
var Address = sqldb.model('addressHistory');
var Education = sqldb.model('userEducation');
var passport = require('passport');
var config = require('../../../config/environment');
var jwt = require('jsonwebtoken');
var Sequelize = require('sequelize');


var validationError = function(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    console.log(err);
    res.json(statusCode, err);
  };
};

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.send(statusCode, err);
  };
}
function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function() {
    res.status(statusCode).end();
  };
}

exports.newRoommate = function(req, res, next) {
  var userAttributes = ['firstname', 'lastname', 'profileImage', 'email'];
  var creator = req.userId;
  var roommate = req.body.roommateId;
  //check if user trying add himself
  if(creator === roommate) {return res.status(403).send('cant add yourself').end()}
  //check if roommate already exists
  Roommate.findOne({
    where: {
      roommateId:roommate, userId:creator
    }
  }).then(function (exists) {
    if(exists) {return res.status(403).send('cant add same roommate twice').end();}
  });
  //check if other roommate added him, if not confirmed set confirmation to true
  Roommate.findOne({
    where: {
      roommateId:creator, userId:roommate
    }
  }).then(function (exists) {
    if(exists && exists.confirmed) {
      return res.status(403).send({error: 'already roommates'}).end();
    } else if (exists && !exists.confirmed) {
      exists.confirmed = true;
      exists.save()
        .then(function (result) {
          return res.json({approved:true});
        });
    } else {
      //if no above condition is satisfied create new roommate set confirmation to false
      req.body.userId = creator;
      req.body.roommateId = roommate;
      req.body.confirmed = false;
      req.body.createdAt = new Date();
      req.body.fromDate = new Date();
      req.body.id = null;
      var newRoommate = Roommate.build(req.body);
      newRoommate.save()
        .then(function(room) {
          Roommate.find({
            where:{
              userId:room.userId
            },
            include: [
              { model: User, attributes: userAttributes, as: 'relatedRoommateId',
                include:[
                  { model: Address, as: 'addresshistoryUsers' },
                  { model: Education, as: 'usereducationUsers' }]
              }
            ]
          }).then(function(roommates) {
            return res.json(roommates);
          })
        })
        .catch(validationError(res));
    }
  })

};

exports.showRoommates= function(req, res, next) {
  var userAttributes = ['firstname', 'lastname', 'profileImage', 'email'];
  var own = [];
  var his = [];
  Roommate.findAll({
    where:{
      userId:req.userId
    },
    include: [
      { model: User, attributes: userAttributes, as: 'relatedRoommateId',
        include:[
          { model: Education, as: 'usereducationUsers' }]
      }
    ]
  }).then(function(o) {
    own = o;
    Roommate.findAll({
      where:{
        roommateId:req.userId
      },
      include: [
        { model: User, attributes: userAttributes, as: 'relatedUserId',
          include:[
            { model: Education, as: 'usereducationUsers' }]
        }
      ]
    }).then(function (h) {
      his = h;
      var result = own.concat(his);
      return res.json(result);
    });
  });

};

exports.showRequests= function(req, res, next) {
  Roommate.findAll({
    where:{
      roommateId:req.userId, confirmed:false
    }
  }).then(function(o) {
    console.log(o.length);
    res.send({requests:o.length});
  });
};

exports.deleteRoommate= function(req, res, next) {
  Roommate.destroy({
    where: {
      id: req.params.id
    }})
    .then(respondWith(res, 204))
    .catch(handleError(res));
};

exports.getRoommate= function(req, res, next) {
  Roommate.find({
    where: {
      id: req.params.id
    }})
    .then(function (room) {
      res.json(room);
    })
    .catch(handleError(res));
};

exports.saveRoommate= function(req, res, next) {
  Roommate.find({
    where: {
      id: req.params.id
    }})
    .then(function (room) {
      var updated = _.merge(room, req.body);
      updated.save().then(function (upd) {
        res.json(upd);
      })
    })
    .catch(handleError(res));
};

exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
