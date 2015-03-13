(function () {

  "use strict";

  angular
    .module('app.dashboard', [])
    .config(function($stateProvider) {
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
    });

  function getCurrentUser(common, $q) {
    var deferred = $q.defer();
    common.Auth.getCurrentUser(function(user) {
      deferred.resolve(user);
    });
    return deferred.promise;
  }

  function getUserLookings(common, currentUser) {
      return common.dataservice.getAllLookings(currentUser.id);
  }

  function allLooking(common, currentUser) {
    if(currentUser){
    return common.dataservice.getEveryLooking();}
  }


}());
