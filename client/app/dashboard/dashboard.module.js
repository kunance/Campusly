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
            }
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

  getData.$inject = ['$q', 'common', 'currentUser', 'RoomListingView', 'RoomListing'];
  function getData($q, common, currentUser, RoomListingView, RoomListing) {
    var allLookings = common.dataservice.getEveryLooking();
    var getUserLookings = common.dataservice.getAllLookings(currentUser.id);
    var allRoomListing = RoomListingView.query();
    var userRoomLookings = RoomListing.query({userId: currentUser.id});
    return $q.all([allLookings.$promise, getUserLookings.$promise, allRoomListing.$promise, userRoomLookings.$promise]);
  }

}());
