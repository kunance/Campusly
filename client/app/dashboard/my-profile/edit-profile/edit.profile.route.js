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
      controller: 'editProfileCtrl',
      controllerAs:'editProfile',
      authenticate: true
    });
  }

}());
