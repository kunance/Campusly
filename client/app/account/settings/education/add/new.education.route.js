(function () {
  "use strict";

  angular
    .module('app.account')
    .config(function($stateProvider) {
      $stateProvider
        .state('settings.education.new', {
          url: '/new',
          templateUrl: 'app/account/settings/education/add/new.education.html',
          controller: 'AddEducationCtrl',
          controllerAs:'addEducation',
          authenticate: true
        });
    });

}());
