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
          currentUser: getCurrentUser,
          data: getData,
          getCreatorRoommates:getCreatorRoommates
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

    getData.$inject = ['common', 'currentUser', '$q', 'RoomListingView', '$stateParams'];
    function getData(common, currentUser, $q, RoomListingView, $stateParams) {
      var edu = common.dataservice.getAllEducations(currentUser.id);
      var roomListing = RoomListingView.get({id: $stateParams.param});
      return $q.all([edu.$promise, roomListing.$promise]);
    }

    getCreatorRoommates.$inject = ['common', 'data', '$q'];
    function getCreatorRoommates(common, data, $q) {
      var roommate = common.dataservice.getAllRoommates(data[1].roomDetails.creatorId);
      return $q.all([roommate.$promise]);
    }

}());

