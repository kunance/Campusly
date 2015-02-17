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
          resolve: {
            getUser: getUser
          },
          authenticate: true
        });
    });

  function getUser(common) {
    var id = common.Auth.getCurrentUser().id;
    return common.Auth.getUser(id);
  }

}());
