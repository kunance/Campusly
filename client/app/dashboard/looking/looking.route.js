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
          currentUser:getCurrentUser,
          data:getData
        }
      });

    getCurrentUser.$inject = ['common', '$q'];
    function getCurrentUser(common, $q) {
      var deferred = $q.defer();
      common.Auth.getCurrentUser(function(user) {
        deferred.resolve(user);
      });
      return deferred.promise;
    }
  }

  getData.$inject = ['common', '$q'];
  function getData(common, $q) {
    var univ = common.dataservice.getAllUniversities();
    return $q.all([univ.$promise]);
  }

}());
