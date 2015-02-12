(function () {
  "use strict";

  angular
    .module('app.account')
    .config(function($stateProvider) {
      $stateProvider
        .state('settings.education.edit', {
          url: '/edit/:id',
          templateUrl: 'app/account/settings/education/edit/edit.education.html',
          controller: 'EditEducationCtrl',
          controllerAs:'editEducation',
          resolve:{
            getEducation: function (common, $stateParams) {
              var educationId = $stateParams.id;
              var dataservice = common.dataservice;
              var me = common.Auth.getCurrentUser();
              return dataservice.getEducation(me, educationId);
            }
          },
          authenticate: true
        });
    });

}());
