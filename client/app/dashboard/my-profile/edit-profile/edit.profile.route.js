(function() {
  "use strict";

  angular
  .module('app.dashboard')
  .config(config);

  config.$inject=['$stateProvider'];

  function config ($stateProvider) {
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

  getCurrentUser.$inject=['common', '$q'];
  function getCurrentUser(common, $q) {
    var deferred = $q.defer();
    common.Auth.getCurrentUser(function(user) {
      deferred.resolve(user);
    });
    return deferred.promise;
  }

  getUniversities.$inject=['common', 'currentUser', '$q'];
  function getUniversities(common, currentUser, $q) {
    if(currentUser){
      var deferred = $q.defer();
      common.dataservice.getAllUniversities(function (data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    }
  }

  getEducations.$inject=['common', 'currentUser'];
  function getEducations(common, currentUser) {
    return common.dataservice.getAllEducations(currentUser.id);
  }

  getAddresses.$inject=['common', 'currentUser'];
  function getAddresses(common, currentUser) {
    return common.dataservice.getAllAddresses(currentUser.id);
  }

}());
