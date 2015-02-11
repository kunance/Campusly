(function () {
  "use strict";

  angular.module('app.account')
    .config(function($stateProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'app/account/login/login.html',
          controller: 'LoginCtrl'
        })
        .state('logout', {
          url: '/logout?referrer',
          referrer: 'main',
          template: '',
          controller: function($state, Auth) {
            var referrer = $state.params.referrer ||
              $state.current.referrer ||
              'main';
            Auth.logout();
            $state.go(referrer);
          }
        })
        .state('signup', {
          url: '/signup',
          templateUrl: 'app/account/signup/signup.html',
          controller: 'SignupCtrl',
          controllerAs:'signup'
        });
    })
    .run(function($rootScope) {
      $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
        if (next.name === 'logout' && current && current.name && !current.authenticate) {
          next.referrer = current.name;
        }
      });
    });


}());
