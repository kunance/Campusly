(function() {
  "use strict";

  angular
  .module('app.dashboard')
  .config(config);

  config.$inject=['$stateProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.when('/dashboard', '/dashboard/summary');
    $stateProvider
    .state('dashboard.myProfile.editProfile', {
      url: '/edit',
      templateUrl: 'app/dashboard/my-profile/edit-profile/edit.profile.html',
      controller: 'EditProfileCtrl',
      controllerAs:'editProfile',
        resolve:{
          getUniversities:getUniversities,
          getEducations: getEducations,
          getAddresses: getAddresses
        },
      authenticate: true
    });
  }

  function getUniversities(common) {
    var dataservice = common.dataservice;
    return dataservice.getAllUniversities();
  }

  function getEducations(common, $q) {
    var deffered = $q.defer();
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    deffered.resolve(dataservice.getAllEducations(me));
    return deffered.promise;
  }

  function getAddresses(common) {
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    return dataservice.getAllAddresses(me);
  }

}());
