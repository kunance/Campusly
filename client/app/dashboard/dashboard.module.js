(function () {

  "use strict";

  angular
    .module('app.dashboard', [])
    .config(config);

     config.$inject = ['$stateProvider'];
      function config($stateProvider) {
        $stateProvider
          .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs:'dashboard',
            authenticate: true,
            resolve:{
              currentUser:getCurrentUser,
              data:getData
            },
            cache:false
          });
      }

  getCurrentUser.$inject = ['common', '$q'];
  function getCurrentUser(common, $q) {
    var deferred = $q.defer();
    common.Auth.getCurrentUser(function(user) {
      console.log(user);
      deferred.resolve(user);
    });
    return deferred.promise;
  }

  getData.$inject = ['$q', 'common', 'currentUser', 'RoomListingView', 'RoomListing', 'UserResource'];
  function getData($q, common, currentUser, RoomListingView, RoomListing, UserResource) {
      var allLookings = common.dataservice.getEveryLooking({limit: 6});
      var getUserLookings = common.dataservice.getAllLookings(currentUser.id);
      var allRoomListing = RoomListingView.query({limit: 9});
      var userRoomLookings = RoomListing.query({userId: currentUser.id});
      var requests = common.dataservice.getRequests(currentUser.id);
      var aroundYou= UserResource.aroundMe({distance:( 5 * 1609 ), limit: 20});// 5 miles default value limit 6
      var edu = common.dataservice.getAllEducations(currentUser.id);
      return $q.all([allLookings.$promise, getUserLookings.$promise, allRoomListing.$promise, userRoomLookings.$promise, requests.$promise, aroundYou.$promise, edu.$promise]);
  }
}());
