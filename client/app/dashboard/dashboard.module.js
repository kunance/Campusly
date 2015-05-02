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
      deferred.resolve(user);
    });
    return deferred.promise;
  }

  getData.$inject = ['$q', 'common', 'currentUser', 'RoomListing', 'UserResource'];
  function getData($q, common, currentUser, RoomListing, UserResource) {
      var getUserLookings = common.dataservice.getAllLookings(currentUser.id);
      var userRoomLookings = RoomListing.query({userId: currentUser.id});
      var requests = common.dataservice.getRequests(currentUser.id);
      var aroundYou= UserResource.aroundMe({distance:(1609 * (currentUser.experianIdToken || 1)), limit: 12});
      var adr = common.dataservice.getAllAddresses(currentUser.id);
      var status = common.dataservice.getStatus(currentUser.id);
      var edu = common.dataservice.getAllEducations(currentUser.id);
      return $q.all([null, getUserLookings.$promise, userRoomLookings.$promise, requests.$promise,
        aroundYou.$promise, adr.$promise, status.$promise, edu.$promise]);
  }
}());
