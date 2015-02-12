(function () {
  "use strict";

  angular
    .module('app.account')
    .config(function($stateProvider) {
      $stateProvider
        .state('settings', {
          url: '/settings',
          templateUrl: 'app/account/settings/settings.html',
          controller: 'SettingsCtrl',
          authenticate:true,
          controllerAs:'settings'
        });
    });

}());
