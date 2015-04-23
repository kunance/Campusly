/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var SignupPage = function() {
  this.form = element(by.css('.main-form'));
  this.form.firstname = this.form.element(by.model('signup.user.firstname'));
  this.form.lastname = this.form.element(by.model('signup.user.lastname'));
  this.form.email = this.form.element(by.model('signup.user.email'));
  this.form.password = this.form.element(by.model('signup.user.password'));
  this.form.submit = this.form.element(by.css('.btn-rented-large'));
  this.signupHeading = element(by.css('.heading'));
  this.mailSent = element(by.css('.fa-envelope-o'));
  this.error = element(by.binding('{{ signup.errors.email }}'));

  this.signup = function(data) {
    for (var prop in data) {
      var formElem = this.form[prop];
      if (data.hasOwnProperty(prop) && formElem && typeof formElem.sendKeys === 'function') {
        formElem.sendKeys(data[prop]);
      }
    }

    this.form.submit.click();
  };
};

module.exports = new SignupPage();

