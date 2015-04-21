(function() {
  "use strict";

  angular
    .module('app.rooms', [])
    .config(config);

  config.$inject=['$stateProvider',];

  function config ($stateProvider) {
    $stateProvider
      .state('rooms', {
      url: '/rooms',
      templateUrl: 'app/rooms/rooms.html',
      controller: 'RoomsCtrl',
      controllerAs:'rooms',
        resolve:{
          currentUser : getCurrentUser,
          data : getData
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

  getData.$inject = ['common', 'currentUser', '$q'];
  function getData(common, currentUser, $q) {
    var edu = common.dataservice.getAllEducations(currentUser.id);
    return $q.all([edu.$promise]);
  }

}());
