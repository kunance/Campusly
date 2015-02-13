(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('settings.occupation', {
        url: '/occupation',
        templateUrl: 'app/account/settings/occupation/occupation.html',
        controller: 'OccupationCtrl',
        controllerAs:'occupation',
        //resolve:{
        //  getOccupations: getOccupations
        //},
        authenticate: true
      });
  }

  //function getOccupations(common) {
  //  var dataservice = common.dataservice;
  //  var me = common.Auth.getCurrentUser();
  //  return dataservice.getAllOccupations(me)
  //}


}());
