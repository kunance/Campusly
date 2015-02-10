(function () {
  "use strict";

  angular
    .module('app.account')
    .config(function($stateProvider) {
      $stateProvider
        .state('settings.password', {
          url: '/password',
          templateUrl: 'app/account/settings/password/password.html',
          controller: 'PasswordCtrl',
          authenticate: true
        });
    });

}());
