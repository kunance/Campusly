'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var User = sqldb.model('rentedUser');
var Vehicle = sqldb.model('userVehicle');
var Pets = sqldb.model('pet');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var mandrill = require('../../components/mandrill');
var s3 = require('../../components/aws-s3/index');
var UserCurAddressUnivCoords = sqldb.model('userCurAddressUnivCoords');

var validationError = function(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    console.log(err);
    res.status(statusCode).json(err);
  };
};

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).json(err);
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
  var userAttributes = ['id', 'firstname', 'lastname', 'profileImage', 'email', 'createdAt'];
  User.findAll({
    attributes: userAttributes
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
  var userAttributes = ['id', 'aboutMe', 'username', 'confirmedEmail', 'createdAt',
    'firstname', 'email', 'phone', 'lastname', 'profileImage', 'role'];
  var userId = req.user.id;
  User.find({
    where: {
      id: userId
    },
    attributes: userAttributes
  })
    .then(function(user) { // don't ever give out the password or salt
      if (!user) { return res.status(401).end(); }
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
  User.find({
    where:{
      email:req.body.email
    }})
    .then(function (user) {
        req.body.salt = "temporary";
        req.body.confirmedEmail = false;
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
    });
};


/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;
  var userAttributes = ['id', 'confirmedEmail', 'firstname', 'email', 'phone', 'lastname', 'profileImage', 'facebook'];
  User.find({
    where: {
      id: userId
    },
    attributes: userAttributes
  })
    .then(function(user) {
      if (!user) {
        return res.status(401).end();
      }
      else{
      res.json(user);
      }
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
        return res.status(403).end();
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
          .then(function (updatedUser) {
            res.send(updatedUser)
          })
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
  User.find({
    where: {
      id: req.params.id
    }
  })
    .then(function(user) {
      if(user){
        var s3Path = user.profileImage;
        s3.download(s3Path, function (err, imageStream) {
          if(err) {
            res.send(500, err)
          }
          imageStream.pipe(res);
        })
      } else{
        res.send(401);
      }
    })


};

exports.currentAddressAndUniv = function(req, res, next) {
  console.log('Enter!!!!!!!!!!!!!!!!', req.params.id);
  var attributes = ['userId', 'addressLatitude', 'addressLongitude', 'univLatitude', 'univLongitude', 'univName'];
  UserCurAddressUnivCoords.findAll({})
    .then(function(coords) {
      console.log(coords);
      if (!coords) {
        console.log('nema ih');
        return res.send();
      }
      else{
        console.log('ima ih');
        res.json(coords);
      }
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
