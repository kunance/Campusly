//(function() {
//  "use strict";
//
//  angular.module('app.account')
//    .controller('PwdResetCtrl', PwdResetCtrl);
//
//  PwdResetCtrl.$inject = ['Auth', '$stateParams','common'];
//
//  function PwdResetCtrl (Auth, $stateParams,common) {
//    var vm = this;
//    var passwordResetToken = $stateParams.passwordResetToken;
//    var pwdResetState = 'mailform';
//    vm.pwdResetMailSend = false;
//
//    if (passwordResetToken) {
//      Auth.confirmResetedPassword( passwordResetToken)
//        .then( function() {
//          pwdResetState = 'valid_token';
//        })
//        .catch( function() {
//          pwdResetState = 'invalid_token';
//        });
//    }
//
//    vm.sendPwdResetMail = function(form) {
//      vm.submitted = true;
//      form.email.$setValidity('unknownMailAddress',true);
//      if(form.$valid) {
//        vm.pwdResetMailSend = true;
//        Auth.sendPwdResetMail( vm.reset.email, vm.reset.newPassword)
//          .then( function() {
//            pwdResetState = 'mailsent';
//          })
//          .catch( function() {
//            form.email.$setValidity('unknownMailAddress',false);
//            vm.pwdResetMailSend = false;
//          });
//      }
//    };
//
//    vm.resetStateIs = function(state) {
//      return pwdResetState===state;
//    };
//
//    mixpanel.track('password reset');
//  }
//
//})();
