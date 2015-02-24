'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var User = sqldb.model('rented.rentedUser');
var Vehicle = sqldb.model('rented.userVehicle');
var Pets = sqldb.model('rented.pet');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var mandrill = require('../../components/mandrill');
var s3 = require('../../components/aws-s3/index');

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
      'profileImage',
      'email',
      'createdAt'
    ]
  })
    .then(function(users) {
      res.json(users);
    })
    .catch(handleError(res));
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userid = req.user.id;
  User.find({
    where: {
      id: userid
    },
    attributes: [
      'id',
      'aboutMe',
      'username',
      'middlename',
      'confirmedEmail',
      'createdAt',
      'firstname',
      'email',
      'phone',
      'lastname',
      'role',
      'provider',
      'profileImage'
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
    },
    attributes: [
      'id',
      'username',
      'middlename',
      'confirmedEmail',
      'firstname',
      'email',
      'phone',
      'lastname',
      'profileImage'
    ]
  })
    .then(function(user) {
      if (!user) {
        return res.send(401);
      }
      res.json(user);
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
  console.log(req.body);
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

exports.changeProfileImage = function(req, res, next) {
  var item = req.files.file;
  var localPath = item.path;
  var s3Path = '/'+ item.name;
  var userId = req.user.id;
  s3.upload(localPath, s3Path, function(err) {
    if (err)
      return res.send(500, 'upload failure');
    User.find({
      where: {
        id: userId
      }
    })
      .then(function(user) {
        if(user){
          user.profileImage = s3Path;
          user.save()
            .then(res.send(200,user))
            .catch(validationError(res));
        } else{
          res.send(401);
        }
      })
  });

};

exports.downloadProfileImage = function(req, res, next) {
  console.log('usa san');
  User.find({
    where: {
      id: req.params.id
    }
  })
    .then(function(user) {
      if(user){
        var s3Path = user.profileImage;
        console.log('ovo je s3 path', s3Path);
        s3.download(s3Path, function (err, imageStream) {
          if(err) {
            console.log('error sa s3', err);
            res.send(500, err)
          }
          console.log('sad cu pipeat');
          imageStream.pipe(res);
        })
      } else{
        res.send(401);
      }
    })


};



/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
