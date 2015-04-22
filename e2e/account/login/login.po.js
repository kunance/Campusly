/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var LoginPage = function() {
  this.emailInput = element(by.name('email'));
  this.passwordInput = element(by.name('password'));
  this.loginButton = element(by.name('submit'));
  this.helpBlock = element(by.css('.help-block'));

  //this.login = function(data) {
  //  for (var prop in data) {
  //    var formElem = this.form[prop];
  //    if (data.hasOwnProperty(prop) && formElem && typeof formElem.sendKeys === 'function') {
  //      formElem.sendKeys(data[prop]);
  //    }
  //  }
  //
  //  this.form.submit.click();
  //};
};

module.exports = new LoginPage();

