
(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
      $stateProvider
        .state('addNewLooking', {
          url: '/addLooking',
          templateUrl: 'app/dashboard/my-profile/add-looking/new.looking.html',
          controller: 'NewLookingCtrl',
          controllerAs: 'newLooking',
          resolve: {
            currentUser: getCurrentUser,
            data:getData
          },
          authenticate: true,
          cache:false
        })
    }

  getCurrentUser.$inject = ['common', '$q'];
  function getCurrentUser(common, $q) {
    var deferred = $q.defer();
    common.Auth.getCurrentUser(function(user) {
      deferred.resolve(user);
    });
    return deferred.promise;
  }

  getData.$inject = ['common', '$q', 'currentUser'];
  function getData(common, $q, currentUser) {
    var edu = common.dataservice.getAllEducations(currentUser.id);
    var univ = common.dataservice.getAllUniversities();
    return $q.all([edu.$promise, univ.$promise]);
  }

}());
