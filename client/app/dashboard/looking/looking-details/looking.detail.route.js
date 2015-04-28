(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider'];

  function config ($stateProvider) {
    $stateProvider
      .state('lookingDetail', {
        url: '/lookingDetail/:param',
        templateUrl: 'app/dashboard/looking/looking-details/looking.detail.html',
        controller: 'LookingDetailsCtrl',
        controllerAs:'detail',
        resolve:{
          currentUser:getCurrentUser,
          getLookingById:getLookingById
        },
        authenticate: true,
        cache: false
      });
  }

  getCurrentUser.$inject = ['common', '$q', '$stateParams', '$rootScope'];
  function getCurrentUser(common, $q, $stateParams, $rootScope) {
    var lookingId = $stateParams.param;
    $rootScope.redirectTo = {state: 'lookingDetail', value: lookingId};
    var deferred = $q.defer();
    common.Auth.getCurrentUser(function(user) {
      deferred.resolve(user);
    });
    return deferred.promise;
  }

  getLookingById.$inject = ['common', '$stateParams', '$q'];
  function getLookingById(common, $stateParams, $q) {
    var lookingId = $stateParams.param;
    var looking = common.dataservice.getSingleLooking(lookingId);
    return $q.all([looking.$promise]);
  }

}());

