(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('lookingDetail', {
        url: 'lookingDetail/:id',
        templateUrl: 'app/dashboard/looking/looking-details/looking.detail.html',
        controller: 'LookingDetailsCtrl',
        controllerAs:'detail',
        authenticate: true,
        resolve:{
          currentUser:getCurrentUser,
          getLookingById:getLookingById,
          getEducations: getEducations
        }
      });
  }

  function getCurrentUser(common, $q) {
    var deferred = $q.defer();
    common.Auth.getCurrentUser(function(user) {
      deferred.resolve(user);
    });
    return deferred.promise;
  }
  function getLookingById(common, $stateParams) {
    var lookingId = $stateParams.id;
    return common.dataservice.getSingleLooking(lookingId);
  }

  function getEducations(common, currentUser) {
    return common.dataservice.getAllEducations(currentUser.id);
  }


}());

