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
          data:getData
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

  getData.$inject = ['common', '$q', 'currentUser'];
  function getData(common, $q, currentUser) {
    var univ = common.dataservice.getAllUniversities();
    var edu = common.dataservice.getAllEducations(currentUser.id);
    var adr = common.dataservice.getAllAddresses(currentUser.id);
    return $q.all([univ.$promise, edu.$promise, adr.$promise]);
  }

}());
