(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);


  config.$inject = ['$stateProvider'];
  function config($stateProvider) {

    $stateProvider
      .state('unsubscribe', {
        url: '/unsubscribe/:param',
        templateUrl: 'app/account/unsubscribe/unsubscribe.html',
        controller: 'UnsubscribeCtrl',
        controllerAs: 'vm',
        resolve:{
          currentUser:getCurrentUser
        },
        authenticate: false,
        cache: false
      });
  }

  getCurrentUser.$inject = ['common', '$q', '$stateParams'];
  function getCurrentUser(common, $q, $stateParams) {
    var token = $stateParams.param;
    var deferred = $q.defer();
    common.Auth.getUserByToken(token)
      .then(function (user) {
        if(user.confirmedEmail===false){
          common.Auth.logout();
        } else {
          deferred.resolve(user);
        }
      })
      .catch(function (err) {
        deferred.reject(err);
      });
    return deferred.promise;
  }

}());
