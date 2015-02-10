(function () {
  "use strict";

  angular
    .module('app.account')
    .config(function($stateProvider) {
      $stateProvider
        .state('settings.userInfo', {
          url: '/userInfo',
          templateUrl: 'app/account/settings/user_info/user.info.html',
          controller: 'UserInfoController',
          controllerAs:'info',
          authenticate: true
        });
    });

}());
