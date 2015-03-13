(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('looking', {
        url: '/looking',
        templateUrl: 'app/dashboard/looking/looking.html',
        controller: 'LookingCtrl',
        controllerAs:'looking',
        authenticate: true,
        resolve:{
          allLooking:allLooking,
          currentUser:getCurrentUser
        }
      });

    function getCurrentUser(common, $q) {
      var deferred = $q.defer();
      common.Auth.getCurrentUser(function(user) {
        deferred.resolve(user);
      });
      return deferred.promise;
    }  }

  function allLooking(common, currentUser, $q) {
    if(currentUser){
      var deferred = $q.defer();
      common.dataservice.getEveryLooking(function (data) {
         deferred.resolve(data);
      });
      return deferred.promise;
    }
  }
}());
