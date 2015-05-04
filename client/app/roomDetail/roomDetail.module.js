(function() {
  "use strict";

  angular
    .module('app.roomDetail', [])
    .config(config);

  config.$inject=['$stateProvider'];

  function config ($stateProvider) {
    $stateProvider
      .state('roomDetail', {
        url: '/roomDetail/:param/of/:allIds',
        templateUrl: 'app/roomDetail/roomDetail.html',
        controller: 'RoomDetailCtrl',
        controllerAs: 'room',
        resolve: {
          currentUser: getCurrentUser
        },
        authenticate: true,
        cache:false
      });
  }

    getCurrentUser.$inject = ['common', '$q', '$stateParams', '$rootScope'];
    function getCurrentUser(common, $q, $stateParams, $rootScope) {
      var RoomId = $stateParams.param;
      $rootScope.redirectTo = {state: 'roomDetail', value: RoomId};
      var deferred = $q.defer();
      common.Auth.getCurrentUser(function(user) {
        deferred.resolve(user);
      });
      return deferred.promise;
    }

}());

