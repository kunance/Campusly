angular.module('RentedApp', [
  /*
   * Order is not important. Angular makes a
   * pass to register all of the modules listed
   */
  'app.core',
  'app.widgets',

  /*
   * Feature areas
   */
  'app.dashboard',
  'app.layout',
  'app.account',
  'app.landing'
])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
      $urlRouterProvider
        .otherwise('/dashboard');

  $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('authInterceptor');
  $locationProvider.hashPrefix('!');

  $httpProvider.interceptors.push(['$q', '$injector', function ($q, $injector) {
    return {
      'request': function(config) {
        // do something on success
        // start with 30 seconds for default timeout value when calling any network dependent service such as db or elastic search
        config.timeout = 300000;
        return config;
      },

      'requestError': function(rejection) {
        // do something on error
//				if (canRecover(rejection)) {
//					return responseOrNewPromise
//				}
        return $q.reject(rejection);
      },

      'response': function(response) {
        // do something on success
        return response;
      },

      'responseError': function (response) {
        //console.log('RESPONSE ERROR: ', response);
        return $q.reject(response);
      }
    };
  }]);
})

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $injector) {
    var state;
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {
        if (response.status === 401) {
          (state || (state = $injector.get('$state'))).go('login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })
  .run(['$rootScope', '$state', 'Auth', '$stateParams', 'common', '$location', function ($rootScope, $state, Auth, $stateParams, common, $location) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      //console.log('Current state: ', $state.current.name);
      //console.log('Event: ', event);
      //console.log('Next: ', next);
      common.logger.info('Navigating to ' + next.url);
      if (next.authenticate) {
        common.Auth.isLoggedInAsync(function (loggedIn) {
          if (!loggedIn) {
            $location.path('/login');
          }
        });
      }
      //if(next.authenticate) {
      //  Auth.isLoggedIn(function (loggedIn) {
      //    //console.log('logged in: ', loggedIn);
      //    if (!loggedIn) {
      //      $state.go('login');
      //    }
      //  });
      //}
    });
  }]);


