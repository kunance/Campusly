(function () {

  "use strict";

  angular
    .module('app.messages', ['pubnub.angular.service'])
    .config(config);

     config.$inject = ['$stateProvider'];
      function config($stateProvider) {
        $stateProvider
          .state('messages', {
            url: '/messages',
            templateUrl: 'app/messages/messages.html',
            controller: 'MessageCtrl',
            controllerAs:'messages',
            authenticate: true,
            resolve:{
              currentUser:getCurrentUser
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

}());
