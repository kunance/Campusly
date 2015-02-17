(function () {
  "use strict";

  angular
    .module('app.account')
    .config(function($stateProvider) {
      $stateProvider
        .state('settings.occupation.new', {
          url: '/new',
          templateUrl: 'app/account/settings/occupation/add/new.occupation.html',
          controller: 'AddOccupationCtrl',
          controllerAs:'addOccupation',
          authenticate: true
        });
    });

}());
