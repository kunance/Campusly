(function() {
  "use strict";

  angular
    .module('app.roomDetail', [])
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('roomDetail', {
        url: '/roomDetail/:id',
        templateUrl: 'app/roomDetail/roomDetail.html',
        controller: 'RoomDetailCtrl',
        controllerAs: 'room',
        resolve: {
          currentUser: getCurrentUser,
          data: getData,
          getCreatorRoommates:getCreatorRoommates
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

    getData.$inject = ['common', 'currentUser', '$q', 'RoomListingView', '$stateParams'];
    function getData(common, currentUser, $q, RoomListingView, $stateParams) {
      var edu = common.dataservice.getAllEducations(currentUser.id);
      var roomListing = RoomListingView.get({id: $stateParams.id});
      return $q.all([edu.$promise, roomListing.$promise]);
    }

    getCreatorRoommates.$inject = ['common', 'data'];
    function getCreatorRoommates(common, data) {
      return common.dataservice.getAllRoommates(data[1].roomDetails.creatorId)
    }

}());

