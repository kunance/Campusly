(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('settings.education', {
        url: '/education',
        templateUrl: 'app/account/settings/education/education.html',
        controller: 'EducationCtrl',
        controllerAs:'education',
        resolve:{
          getEducations: getEducations
        },
        authenticate: true
      });
  }

   function getEducations(common) {
      var dataservice = common.dataservice;
      var me = common.Auth.getCurrentUser();
      return dataservice.getAllEducations(me)
  }


}());
