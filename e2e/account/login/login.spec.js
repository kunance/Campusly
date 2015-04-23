(function () {
  "use strict";

  var sqldb = require('../../../server/sqldb');
  var UserModel = sqldb.model('rentedUser');
  var request = require('request');

  describe('Login View', function() {
    var page;

    var loadPage = function() {
      browser.get('/login');
      page = require('./login.po');
    };

    var testUser = {
      firstname: 'Test',
      lastname: 'User',
      email: 'ivan@campusly.org',
      password: 'testtest',
      salt : "temporary",
      confirmedEmail : true,
      runIdentityCheck: true,
      shareCreditReport: true,
      shareProfile: true,
      createdAt: new Date(),
      provider: 'local',
      role: 'user'
    };

    before(function() {
      return UserModel
        .destroy({where:{email:testUser.email}})
        .then(function() {
          return UserModel.create(testUser);
        })
        .then(loadPage);
    });

    after(function() {
      return UserModel.destroy({where:{email:testUser.email}});
    });

    it('should include login form with correct inputs and submit button', function() {
      expect(page.form.email.getAttribute('type')).to.eventually.equal('email');
      expect(page.form.email.getAttribute('name')).to.eventually.equal('email');
      expect(page.form.password.getAttribute('type')).to.eventually.equal('password');
      expect(page.form.password.getAttribute('name')).to.eventually.equal('password');
      expect(page.form.submit.getAttribute('type')).to.eventually.equal('submit');
      expect(page.form.submit.getAttribute('value')).to.eventually.equal('Sign me in!');
      expect(page.signin.getText()).to.eventually.equal('Sign In');
    });

    describe('with local auth', function() {
      it('should login a user and redirecting to "dashboard"', function(done) {
        page.login(testUser);
        var navbar = require('../../components/navbar/navbar.po');
        browser.waitForAngular();
        expect(browser.getLocationAbsUrl()).to.eventually.equal(browser.baseUrl + '/dashboard');
        expect(navbar.navbarAccountGreeting.getText()).to.eventually.equal(' Test');
      });

      describe('and invalid credentials', function() {
        before(function() {
          return loadPage();
        });

        it('should indicate login failures', function(done) {
          page.login({
            email: testUser.email,
            password: 'badPassword'
          });
          browser.waitForAngular();
          expect(browser.getLocationAbsUrl()).to.eventually.equal(browser.baseUrl + '/login');
          var helpBlock = page.form.element(by.css('.help-block'));
          expect(helpBlock.getText()).to.eventually.equal('This password is not correct.');
        });
      });
    });
  });

}());
