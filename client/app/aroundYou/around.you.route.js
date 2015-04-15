(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider'];

  function config ($stateProvider) {
    $stateProvider
      .state('aroundYou', {
        url: '/aroundYou',
        templateUrl: 'app/aroundYou/around.you.html',
        controller: 'aroundYouCtrl',
        controllerAs:'around',
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

  getData.$inject = ['common', 'currentUser', '$q', 'UserResource'];
  function getData(common, currentUser, $q, UserResource) {
    var edu = common.dataservice.getAllEducations(currentUser.id);
    var aroundYou= UserResource.aroundMe({distance:( 5 * 1609 ), limit: 20});// 5 miles default value limit 6
    return $q.all([edu.$promise, aroundYou.$promise]);
  }


}());
