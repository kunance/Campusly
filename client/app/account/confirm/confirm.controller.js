(function() {
  'use strict';

  angular.module('app.account')
    .controller('ConfirmCtrl', ConfirmCtrl);

  ConfirmCtrl.$inject = ['common', '$location', '$stateParams'];

  function ConfirmCtrl (common, $location, $stateParams) {
    var vm = this;
    vm.errors = {};
    vm.isLoggedIn = common.Auth.isLoggedIn;
    vm.confirmToken = $stateParams.confirmToken;
    var confirmationMailSend = false;
    vm.invalidToken = false;

    if (vm.confirmToken) {
      common.Auth.confirmMail(vm.confirmToken)
        .then( function() {
          $location.path('/');
        })
        .catch( function() {
          vm.invalidToken = true;
        });
    }

    vm.sendConfirmationMail = function() {
      if(common.Auth.isLoggedIn()) {
        confirmationMailSend = true;
        common.Auth.sendConfirmationMail(function(){
          confirmationMailSend = false;
        });
      }
    };

    vm.confirmationMailSend = function() {
      return confirmationMailSend;
    };
  }

})();
