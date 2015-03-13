'use strict';

var _ = require('lodash');
var sqldb = require('../../../sqldb');
var User = sqldb.model('rentedUser');
var Education = sqldb.model('userEducation');
var passport = require('passport');
var config = require('../../../config/environment');
var jwt = require('jsonwebtoken');


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
    res.send(statusCode);
  };
}

exports.newEducation = function(req, res, next) {
  req.body.userId = req.user.id;
  req.body.createdAt = new Date();
  req.body.graduation = false;
  var newEducation = Education.build(req.body);

  newEducation.save()
    .then(function(education) {
      res.json(education);
    })
    .catch(validationError(res));
};

exports.showEducations= function(req, res, next) {
  //Education.findAll({where:{userId:req.user.id}})
  Education.findOne({where:{userId:req.userId}})
    .then(function (educations) {
      if(educations){
      res.json(educations);
      }else{
        res.json({});
      }
    })
    .catch(validationError(res));
};

exports.deleteEducation= function(req, res, next) {
  Education.destroy({where: { id: req.params.id }})
    .then(respondWith(res, 204))
    .catch(handleError(res));
};

exports.getEducation= function(req, res, next) {
  Education.find({where: { id: req.params.id }})
    .then(function (education) {
      res.json(education);
    })
    .catch(handleError(res));
};

exports.saveEducation= function(req, res, next) {
  Education.find({where: { id: req.params.id }})
    .then(function (education) {
      var updated = _.merge(education, req.body);
      updated.save().then(function (upd) {
        res.json(upd);
      })
    })
    .catch(handleError(res));
};


exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
