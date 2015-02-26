'use strict';

var _ = require('lodash');
var sqldb = require('../../../sqldb');
var User = sqldb.model('rentedUser');
var Finance = sqldb.model('userFinancial');
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

exports.newFinance = function(req, res, next) {
  req.body.userId = req.user.id;
  req.body.createdAt = new Date();
  console.log(req.body);
  var newFinance = Finance.build(req.body);

  newFinance.save()
    .then(function(finance) {
      res.json(finance);
    })
    .catch(validationError(res));
};

exports.showFinances= function(req, res, next) {
  Finance.findAll({where:{userId:req.user.id}})
    .then(function (educations) {
      res.json(educations);
    })
    .catch(validationError(res));
};

exports.deleteFinance= function(req, res, next) {
  Finance.destroy({where: { id: req.params.id }})
    .then(respondWith(res, 204))
    .catch(handleError(res));
};

exports.getFinance= function(req, res, next) {
  Finance.find({where: { id: req.params.id }})
    .then(function (finance) {
      res.json(finance);
    })
    .catch(handleError(res));
};

exports.saveFinance= function(req, res, next) {
  Finance.find({where: { id: req.params.id }})
    .then(function (finance) {
      var updated = _.merge(finance, req.body);
      updated.save().then(function (upd) {
        res.json(upd);
      })
    })
    .catch(handleError(res));
};


exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
