(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('settings.userInfo.edit', {
        url: '/edit',
        templateUrl: 'app/account/settings/user_info/edit/edit.info.html',
        controller: 'EditInfoCtrl',
        controllerAs:'editInfo',
        resolve: {
          getUserInfo: getUserInfo
        },
        authenticate: true
      });
  }

  function getUserInfo(common) {
    return common.Auth.getCurrentUser();
  }

}());
