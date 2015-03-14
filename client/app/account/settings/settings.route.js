(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
      $stateProvider
        .state('settings', {
          url: '/settings',
          templateUrl: 'app/account/settings/settings.html',
          controller: 'SettingsCtrl',
          authenticate: true,
          controllerAs: 'settings'
        });
    }

}());
