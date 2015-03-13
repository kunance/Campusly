(function() {
  "use strict";

  angular
  .module('app.dashboard')
  .config(config);

  config.$inject=['$stateProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.when('/dashboard', '/dashboard/summary');
    $stateProvider
    .state('editProfile', {
      url: '/editProfile',
      templateUrl: 'app/dashboard/my-profile/edit-profile/edit.profile.html',
      controller: 'EditProfileCtrl',
      controllerAs:'editProfile',
        resolve:{
          currentUser: getCurrentUser,
          getUniversities:getUniversities,
          getEducations: getEducations,
          getAddresses: getAddresses
        },
      authenticate: true
    });
  }

  function getCurrentUser(common, $q) {
    var deferred = $q.defer();
    common.Auth.getCurrentUser(function(user) {
      deferred.resolve(user);
    });
    return deferred.promise;
  }
  function getUniversities(common, currentUser) {
    if(currentUser){
    return common.dataservice.getAllUniversities();}
  }

  function getEducations(common, currentUser) {
    return common.dataservice.getAllEducations(currentUser.id);
  }

  function getAddresses(common, currentUser) {
    return common.dataservice.getAllAddresses(currentUser.id);
  }

}());
