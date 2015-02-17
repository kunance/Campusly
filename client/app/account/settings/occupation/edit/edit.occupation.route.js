(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('settings.occupation.edit', {
        url: '/edit/:id',
        templateUrl: 'app/account/settings/occupation/edit/edit.occupation.html',
        controller: 'EditOccupationCtrl',
        controllerAs:'editOccupation',
        resolve:{
          getOccupation: getOccupation
        },
        authenticate: true
      });
  }

  function getOccupation(common, $stateParams) {
    var occupationId = $stateParams.id;
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    return dataservice.getOccupation(me, occupationId);
  }

}());
