"use strict";

var config = require('../../config/environment');
var mandrill = require('node-mandrill')(config.mandrill.APIkey);
var _ = require('lodash');

var emailTemplates;

require('email-templates')(__dirname, { open: '{{', close: '}}' }, function(err, _emailTemplates) {
  if (err) {
    console.log('Error on opening template:', err);
  } else {
    emailTemplates = _emailTemplates;
  }
});

var generateMail = function(templateName, locals, callback){
  emailTemplates(templateName, locals, function(err, html, text) {
    if (err) {
      console.log('Error on generating mail:',err);
    } else {
      callback(html);
    }
  });
};

module.exports.welcome = function (user) {
  mandrill('/messages/send', {
    message: {
      to: [{email: user.email, name: (user.firstname + ' ' + user.lastname)}],
      from_email: 'rented@rented.com',
      subject: "Thanks for signing up to rented co",
      text: "Some text to welcome new users from mandrill..  "
    }
  }, function (error, info) {
    //uh oh, there was an error
    if (error)  cb(error, null);
    else cb(null, info.response);
  });
};

module.exports.confirm = function (templateName, user, subject, locals, callback) {
  var cb = callback || _.noop;
  generateMail(templateName, locals, function (html) {
    var params = {
      message: {
        from_email: config.mail.from,
        to: [{email: user.email, name: (user.firstname + ' ' + user.lastname)}],
        subject: subject,
        html: html
      }
    };
    mandrill('/messages/send', params, function (error, info) {
      if (error) {cb(error, null)}
      else {
        console.log(info);
        cb(null, info.response)}
    });
  })
}

module.exports.passwordReset = function (templateName, user, subject, locals, callback) {
  var cb = callback || _.noop;
  generateMail(templateName, locals, function (html) {
    var params = {
      message: {
        from_email: config.mail.from,
        to: [{email: user.email, name: (user.firstname + ' ' + user.lastname)}],
        subject: subject,
        html: html
      }
    };
    mandrill('/messages/send', params, function (error, info) {
      if (error) {cb(error, null)}
      else {
        console.log(info);
        cb(null, info.response)}
    });
  })
}

