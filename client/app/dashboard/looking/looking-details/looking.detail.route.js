(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('lookingDetail', {
        url: '/lookingDetail/:id',
        templateUrl: 'app/dashboard/looking/looking-details/looking.detail.html',
        controller: 'LookingDetailsCtrl',
        controllerAs:'detail',
        resolve:{
          currentUser:getCurrentUser,
          getLookingById:getLookingById
        },
        authenticate: true
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

  getLookingById.$inject = ['common', '$stateParams', '$q'];
  function getLookingById(common, $stateParams, $q) {
    var lookingId = $stateParams.id;
    var looking = common.dataservice.getSingleLooking(lookingId);
    return $q.all([looking.$promise]);
  }

}());

