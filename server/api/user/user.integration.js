'use strict';

var app = require('../../app');
var _ = require('lodash');
var sqldb = require('../../sqldb');
var User = sqldb.model('rented.rentedUser');
var request = require('supertest');
var should = require('should');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var tokens =[];   //owner, tenant, admin
var userIds = []; //ownerId, tenantId, adminId

var createToken = function(userId) {
  return jwt.sign({id: userId }, config.secrets.session, { expiresInMinutes: 60*5 });
};


describe("User API's:", function() {

  // Clear users before testing
  before(function(done) {
   deleteUsers(done);
  });

  before(function(done) {
    var user1 = User.build({id:'1', provider: 'local', firstname: 'Fake', lastname: 'Owner',username: 'testUsername1', email: 'owner@test.com', password: 'password', role: 'owner', runIdentityCheck: false, shareCreditReport: false, createdAt: new Date()});
    userIds[0] = user1.id;
    tokens[0] = createToken(user1.id);
    user1.save().then(function() {
      var user2 = User.build({id:'2', provider: 'local', firstname: 'Fake', lastname: 'Tenant',username: 'testUsername1', email: 'tenant@test.com', password: 'password', role: 'tenant', runIdentityCheck: false, shareCreditReport: false, createdAt: new Date()});
      userIds[1] = user2.id;
      tokens[1] = createToken(user2.id);
      user2.save().then(function () {
        var user3 = User.build({id:'3', provider: 'local', firstname: 'Fake', lastname: 'Admin',username: 'testUsername1', email: 'admin@test.com', password: 'password', role: 'admin', runIdentityCheck: false, shareCreditReport: false, createdAt: new Date()});
        userIds[2] = user3.id;
        tokens[2] = createToken(user3.id);
        user3.save().then(function () {
          done();
        })
      })
    });
});

  // Clear users after testing
  after(function(done) {
  deleteUsers(done);
  });

   it('Owner user should be able to retrieve his data, his user object (status code: 200)', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + tokens[0])
        .expect(202)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          res.body.id.toString().should.equal(userIds[0].toString());
          done();
        });
    });

  it('Tenant user should be able to retrieve his data, his user object (status code: 200)', function(done) {
    request(app)
      .get('/api/users/me')
      .set('authorization', 'Bearer ' + tokens[1])
      .expect(202)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        res.body.id.toString().should.equal(userIds[1].toString());
        done();
      });
  });

    it('Accessing user resources should result with 401 when user is not logged in', function(done) {
      request(app)
        .get('/api/users/me')
        .expect(401)
        .end(done);
    });

  it('owner should be able to login', function(done) {
    request(app)
      .post('/auth/local')
      .send({email : 'owner@test.com', password : 'password'})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('token');
        done();
      });
  });

  it('tenant should be able to login', function(done) {
    request(app)
      .post('/auth/local')
      .send({email : 'tenant@test.com', password : 'password'})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('token');
        done();
      });
  });

  it('admin should be able to login', function(done) {
    request(app)
      .post('/auth/local')
      .send({email : 'admin@test.com', password : 'password'})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('token');
        done();
      });
  });

  it('admin should see all users', function(done) {
    request(app)
      .get('/api/users')
      .set('authorization', 'Bearer ' + tokens[2])
      .expect(202)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        (JSON.parse(res.text).length).should.equal(3);
        done();
      });
  });

  it('Admin user should be able to retrieve his data, his user object (status code: 200)', function(done) {
    request(app)
      .get('/api/users/me')
      .set('Authorization','Bearer ' + tokens[2])
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('email', 'admin@test.com');
        res.body.should.have.property('role', 'admin');
        done();
      });
  });


  it('Owners should NOT be able to retrieve list of all users (status code: 403)', function(done) {
    request(app)
      .get('/api/users')
      .set('Authorization','Bearer ' + tokens[0])
      .expect(403)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('Tenants should NOT be able to retrieve list of all users (status code: 403)', function(done) {
    request(app)
      .get('/api/users')
      .set('Authorization','Bearer ' + tokens[1])
      .expect(403)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('owner should be able to update his data (status code: 200)', function(done) {
    request(app)
      .put('/api/users/' + userIds[0] + '/password')
      .set('Authorization','Bearer ' + tokens[0])
      .send({oldPassword : 'password', newPassword: 'newpassword'})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
            done();
          });
      });

  it('tenant should be able to update his data (status code: 200)', function(done) {
    request(app)
      .put('/api/users/' + userIds[1] + '/password')
      .set('Authorization','Bearer ' + tokens[1])
      .send({oldPassword : 'password', newPassword: 'newpassword'})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('admin should be able to update his data (status code: 200)', function(done) {
    request(app)
      .put('/api/users/' + userIds[2] + '/password')
      .set('Authorization','Bearer ' + tokens[2])
      .send({oldPassword : 'password', newPassword: 'newpassword'})
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('owner should NOT be able to update other users data (status code: 403)', function(done) {
    request(app)
      .put('/api/users/' + userIds[1] + '/password')
      .set('Authorization','Bearer ' + tokens[0])
      .send({oldPassword : 'newpassword', newPassword: 'password'})
      .expect(403)
      .end(function(err, res) {
        if (err) return done(err);
        request(app)
          .put('/api/users/' + userIds[1] + '/userData')
          .set('Authorization','Bearer ' + tokens[0])
          .send({firstname : 'newFake', lastname: 'newUser'})
          .expect(403)
          .end(function(err, res) {
            if (err) return done(err);
            done();
          });
      });
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
