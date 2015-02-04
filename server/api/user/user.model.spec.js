'use strict';

var _= require('lodash');
var app = require('../../app');
var sqldb = require('../../sqldb');
var User = sqldb.model('rented.rentedUser');

var user = User.build({provider: 'local', firstname: 'usermodel', lastname: 'usermodel',username: 'usermodel', email: 'usermodel@usermodel.com', password: 'password', role: 'owner', runIdentityCheck: false, shareCreditReport: false, createdAt: new Date()});

describe('User Model', function() {

  before(function(done) {
    // Sync and clear users before testing
    User.sync().then(function() {
      //return User.destroy({truncate:true});
      deleteUsers(done);
    });
  });

  afterEach(function(done) {
    //return User.destroy({where: {id: '*'}});
    deleteUsers(done);
  });


  it('should begin with no users', function() {
    return User.findAll()
      .should.eventually.have.length(0);
  });

  it('should fail when saving a duplicate user', function() {
    return user.save()
      .then(function() {
        var userDup = User.build(userTemplate);
        return userDup.save();
      }).should.be.rejected;
  });

  it('should fail when saving without an email', function() {
    user.email = null;
    return user.save().should.be.rejected;
  });

  it('should authenticate user if password is valid', function() {
    user.authenticate('password').should.be.true;
  });

  it('should not authenticate user if password is invalid', function() {
    user.authenticate('blah').should.not.be.true;
  });
});


function deleteUsers(done) {
  return User.findAll().then(function(users) {
    if (users) {
      if (_.isArray(users)) {
        _(users).forEach(function (user) {user.destroy();});
        done();
      } else {
        users.destroy();
        done();
      }
    }
  });
}
