//(function () {
//  "use strict";
//
//  var sqldb = require('../../../server/sqldb');
//  var UserModel = sqldb.model('rentedUser');
//
//  describe('Logout View', function() {
//    var login = function(user) {
//      browser.get('/login');
//      require('../login/login.po').login(user);
//    };
//
//    var testUser = {
//      firstname: 'Test',
//      lastname: 'User',
//      email: 'ivan@campusly.org',
//      password: 'testtest',
//      salt : "temporary",
//      confirmedEmail : true,
//      runIdentityCheck: true,
//      shareCreditReport: true,
//      shareProfile: true,
//      createdAt: new Date(),
//      provider: 'local',
//      role: 'user'
//    };
//
//    beforeEach(function() {
//      return UserModel
//        .destroy({where:{email:testUser.email}})
//        .then(function() {
//          return UserModel.create(testUser);
//        })
//        .then(function() {
//          return login(testUser);
//        });
//    });
//
//    after(function() {
//      return UserModel.destroy({where:{email:testUser.email}});
//    });
//
//    describe('with local auth', function() {
//
//      it('should logout a user and redirecting to "landing"', function() {
//        browser.waitForAngular();
//        var navbar = require('../../components/navbar/navbar.po');
//        expect(browser.getLocationAbsUrl()).to.eventually.equal(browser.baseUrl + '/dashboard');
//        expect(navbar.navbarAccountGreeting.getText()).to.eventually.equal(' Test');
//        expect(navbar.navbarAccountGreeting.isPresent()).to.eventually.equal(true);
//
//        navbar.logout.click(); //browser.get('/logout'); alternative
//
//        browser.waitForAngular();
//        navbar = require('../../components/navbar/navbar.po');
//        expect(browser.getLocationAbsUrl()).to.eventually.equal(browser.baseUrl + '/');
//        expect(navbar.navbarAccountGreeting.isPresent()).to.eventually.equal(false);
//      });
//    });
//  });
//
//
//}());
//
