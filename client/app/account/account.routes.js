// do NOT include braces because we are NOT creating a new module instance 'app.account' , we are just retrieving it
(function () {
  "use strict";

  angular
    .module('app.account')
      .config(config)
      .run(run);

  config.$inject = ['$stateProvider'];
  function config($stateProvider) {

    $stateProvider
      .state('logout', {
        url: '/logout?referrer',
        referrer: '/',
        template: '',
        controller: logout
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup',
        authenticate:false
      });
  }

  run.$inject = ['$rootScope'];
  function run($rootScope) {
    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  }

  logout.$inject = ['$state', 'Auth', '$location'];
  function logout($state, Auth, $location) {
      var referrer = '/';
      Auth.logout();
      $location.path(referrer);
  }

}());
