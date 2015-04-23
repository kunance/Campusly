(function () {
  "use strict";

  var sqldb = require('../../../server/sqldb');
  var UserModel = sqldb.model('rentedUser');

  describe('Signup View', function() {
    var page;

    var loadPage = function() {
      browser.get('/signup');
      page = require('./signup.po');
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
      return loadPage();
    });

    after(function() {
      return UserModel.destroy({where:{email:testUser.email}});
    });

    it('should include signup form with correct inputs and submit button', function() {
      expect(page.form.firstname.getAttribute('type')).to.eventually.equal('text');
      expect(page.form.firstname.getAttribute('name')).to.eventually.equal('firstname');
      expect(page.form.lastname.getAttribute('type')).to.eventually.equal('text');
      expect(page.form.lastname.getAttribute('name')).to.eventually.equal('lastname');
      expect(page.form.email.getAttribute('type')).to.eventually.equal('email');
      expect(page.form.email.getAttribute('name')).to.eventually.equal('email');
      expect(page.form.password.getAttribute('type')).to.eventually.equal('password');
      expect(page.form.password.getAttribute('name')).to.eventually.equal('password');
      expect(page.form.submit.getAttribute('type')).to.eventually.equal('submit');
      expect(page.signupHeading.getText()).to.eventually.equal('Sign up for free');
      expect(page.form.submit.getAttribute('value')).to.eventually.equal('Sign me up!');
    });

    describe('with local auth', function() {
      it('should signup a new user, log them in, and redirecting to "dashboard"', function(done) {
        UserModel.destroy({where:{email:testUser.email}})
          .then(function() {
            page.signup(testUser);

            var navbar = require('../../components/navbar/navbar.po');
            expect(browser.getLocationAbsUrl()).to.eventually.equal(browser.baseUrl + '/signup');
            expect(navbar.navbarAccountGreeting.isPresent()).to.eventually.equal(false);
            expect(page.mailSent.isPresent()).to.eventually.equal(true);
            browser.driver.navigate().refresh();
            done();
        });
      });

      describe('and repeated credentials', function() {
        before(function() {
          return loadPage();
        });

        it('should indicate already exists signup failures', function() {
          page.signup(testUser);

          expect(browser.getLocationAbsUrl()).to.eventually.equal(browser.baseUrl + '/signup');
          expect(page.form.email.getAttribute('ng-class')).to.eventually.contain('has-error');


          expect(page.error.getText()).to.eventually.equal('You have already signed-up! Please Sign-in.');
        });
      });
    });
      //describe('user confirming his e-mail', function() {
      //
      //  before(function() {
      //    return loadPage();
      //  });
      //
      //  describe('with invalid token', function() {
      //    it('should get error', function (done) {
      //      //browser.get('http://localhost:9000/loginVerify/' + testUser.googleOAuthId + 'somethingToTriggerInvalidity');
      //      var request = require('request');
      //
      //      var options = {
      //        method: 'POST',
      //        url: 'http://localhost:9000/loginVerify/'+testUser.googleOAuthId+'somethingToTriggerInvalidity',
      //        headers: {'id': 'AQ8WHWC',
      //          'sessionid': 'XnINW5KDQg=',
      //          'Accept': 'application/json',
      //          'Accept-Language': 'en-us',
      //          'random': 'BS3P5Q'
      //        },
      //        body: '{ "pay_load": [] }'
      //      };
      //
      //      function callback(error, response, body) {
      //        if (!error && response.statusCode == 200) {
      //          var info = JSON.parse(body);
      //          console.log(response);
      //          console.log(info);
      //        }
      //      }
      //      request(options, callback);
      //      done();
      //    });
      //
      //    describe('with valid token', function() {
      //      it('should approve confirmation', function (done) {
      //        //browser.get('http://localhost:9000/loginVerify/' + testUser.googleOAuthId + 'somethingToTriggerInvalidity');
      //
      //        var request = require('request');
      //
      //        var options = {
      //          method: 'POST',
      //          url: 'http://localhost:9000/loginVerify/'+testUser.googleOAuthId,
      //          headers: {'id': 'Ao8WHWC',
      //            'sessionid': 'XnINo5KDQg=',
      //            'Accept': 'application/json',
      //            'Accept-Language': 'en-us',
      //            'random': 'BS3o5Q'
      //          },
      //          body: '{ "pay_load": [] }'
      //        };
      //
      //        function callback(error, response, body) {
      //          if (!error && response.statusCode == 200) {
      //            var info = JSON.parse(body);
      //            console.log(response);
      //            console.log(info);
      //          }
      //        }
      //        request(options, callback);
      //        done();
      //      });
      //    });
      //
      //  });
      //});
  });

}());

