(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider'];

  function config ($stateProvider) {
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

  getData.$inject = ['common', '$q', 'currentUser'];
  function getData(common, $q, currentUser) {
    var univ = common.dataservice.getAllUniversities();
    var edu = common.dataservice.getAllEducations(currentUser.id);
    return $q.all([univ.$promise, edu.$promise]);
  }

}());
