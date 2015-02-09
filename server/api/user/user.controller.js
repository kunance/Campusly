'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var User = sqldb.model('rented.rentedUser');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var mandrill = require('../../components/mandrill');

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

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.findAll({
    attributes: [
      'id',
      'firstname',
      'lastname',
      'email',
      'role',
      'provider',
      'runIdentityCheck',
      'shareCreditReport',
      'createdAt'
    ]
  })
    .then(function(users) {
      res.json(users);
    })
    .catch(handleError(res));
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
  req.body.runIdentityCheck= false;
  req.body.shareCreditReport= false;
  req.body.createdAt= new Date();
  var newUser = User.build(req.body);
  newUser.setDataValue('provider', 'local');
  newUser.setDataValue('role', 'user');
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ id: user.id }, config.secrets.session, {
        expiresInMinutes: 60 * 5
      });
      res.json({ token: token });
    })
    .catch(validationError(res));
};


/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;

  User.find({
    where: {
      id: userId
    }
  })
    .then(function(user) {
      if (!user) {
        return res.send(401);
      }
      res.json(user.profile);
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.destroy({ id: req.params.id })
    .then(respondWith(res, 204))
    .catch(handleError(res));
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user.id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);
  User.find({
    where: {
      id: userId
    }
  })
    .then(function(user) {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(respondWith(res, 200))
          .catch(validationError(res));
      } else {
        return res.send(403);
      }
    });
};

exports.changeInfo = function(req, res, next) {
  var userId = req.user.id;
  User.find({
    where: {
      id: userId
    }
  })
    .then(function(user) {
      if(user){
        var updated = _.merge(user, req.body);
        updated.updatedAt = new Date();
        updated.save()
         .then(respondWith(res, 200))
         .catch(validationError(res));
      } else{
        res.send(401);
      }
    })
};


/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user.id;
  User.find({
    where: {
      id: userId
    },
    attributes: [
      'id',
      'middlename',
      'firstname',
      'email',
      'phone',
      'lastname',
      'username',
      'role',
      'provider'
    ]
  })
    .then(function(user) { // don't ever give out the password or salt
      if (!user) { return res.json(401); }
      res.json(user);
    })
    .catch(function(err) {
      return next(err);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
