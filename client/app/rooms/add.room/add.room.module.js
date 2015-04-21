(function() {
  "use strict";

  angular
    .module('app.addRoom', [])
    .config(config);

  config.$inject=['$stateProvider'];

  function config ($stateProvider) {
    $stateProvider.state('addRoom', {
      url: '/addRoom',
      templateUrl: 'app/rooms/add.room/add.room.html',
      controller: 'AddNewRoomCtrl',
      controllerAs:'vm',
      bindToController: true,
      resolve:{
        currentUser:getCurrentUser,
        data:getData
      },
      cache:false,
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
  function getData( common, currentUser, $q) {
    var univ = common.dataservice.getAllUniversities();
    var edu = common.dataservice.getAllEducations(currentUser.id);
    return $q.all([univ.$promise, edu.$promise]);
  }

}());

