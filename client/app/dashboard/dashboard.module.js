(function () {

  "use strict";

  angular
    .module('app.dashboard', [])
    .config(config);

     config.$inject = ['$stateProvider'];
      function config($stateProvider) {
        $stateProvider
          .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs:'dashboard',
            authenticate: true,
            resolve:{
              currentUser: getCurrentUser,
              currentUserLookings:getUserLookings,
              allLooking:allLooking
            }
          });
      }

  getCurrentUser.$inject = ['common', '$q'];
  function getCurrentUser(common, $q) {
    var deferred = $q.defer();
    common.Auth.getCurrentUser(function(user) {
      deferred.resolve(user);
    });
    return deferred.promise;
  }

  getUserLookings.$inject = ['common', 'currentUser'];
  function getUserLookings(common, currentUser) {
      return common.dataservice.getAllLookings(currentUser.id);
  }

  allLooking.$inject = ['common', 'currentUser'];
  function allLooking(common, currentUser) {
    if(currentUser){
    return common.dataservice.getEveryLooking();}
  }

}());
