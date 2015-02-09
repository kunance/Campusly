(function (MandrillCtrl) {
  "use strict";

  var config = require('../../config/environment');
  var mandrill = require('node-mandrill')(config.mandrill.APIkey);

  MandrillCtrl.welcome = function (user) {
    mandrill('/messages/send', {
      message: {
        to: [{email: user.email, name: (user.firstname + ' ' + user.lastname)}],
        from_email: 'rented@rented.com',
        subject: "Thanks for signing up to rented co",
        text: "Some text to welcome new users from mandrill..  "
      }
    }, function (error, response) {
      //uh oh, there was an error
      if (error) console.log(JSON.stringify(error));

      //everything's good, lets see what mandrill said
      else console.log(response);
    });
  }



}(module.exports));





