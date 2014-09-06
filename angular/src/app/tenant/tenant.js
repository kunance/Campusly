'use strict';

/* Controllers */
angular.module('myApp.tenant', ['ngRoute'])

// configure views; the authRequired parameter is used for specifying pages
// which should only be available while logged in
.config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.when('/tenants', {
            templateUrl: 'tenant/tenants.tpl.html',
            profileRequired: function (profile)
            {
                 if (profile&&profile.type=='tenant')
                 {
                     if (profile.completedOnBoarding)
                       return '/tenants/dashboard';
                     else
                       return '/tenants/on-boarding';
                 }
            }
        });

        var TENANTS_ONLY= function (profile)
            {
                 console.log('tenants only', profile);

                 if (profile.type!='tenant')
                   return '/tenants'; 
            };

        $routeProvider.when('/tenants/on-boarding/:step?', {
            authRequired: '/register/tenant',
            templateUrl: 'tenant/on-boarding.tpl.html',
            controller: 'OnBoardingCtrl',
            profileRequired: TENANTS_ONLY
        });

        $routeProvider.when('/tenants/dashboard', {
            authRequired: true,
            templateUrl: 'tenant/dashboard.tpl.html',
            controller: 'TenantDashboardCtrl',
            profileRequired: TENANTS_ONLY
        });

        $routeProvider.when('/tenants/properties', {
            authRequired: true,
            templateUrl: 'tenant/properties.tpl.html',
            controller: 'TenantPropertiesCtrl',
            profileRequired: TENANTS_ONLY
        });

        $routeProvider.when('/tenants/profile', {
            authRequired: true,
            templateUrl: 'tenant/profile.tpl.html',
            controller: 'TenantProfileCtrl',
            profileRequired: TENANTS_ONLY
        });
    }
])

.controller('OnBoardingCtrl', ['$scope','$rootScope','$location','$routeParams',
    function($scope,$rootScope,$location,$routeParams) {
       $rootScope.secondaryNav= 'tenant/partials/menu-tenant.tpl.html';

       var steps= {
                     'none':             'tenant/partials/verify-profile-1.tpl.html',
                     'verify-profile-2': 'tenant/partials/verify-profile-2.tpl.html',
                     'credit-check':     'tenant/partials/credit-check.tpl.html',
                     'ready-to-apply':   'tenant/partials/ready-to-apply.tpl.html'
                  };

       $scope.step= steps[$routeParams.step || 'none'];
    }
])

.controller('TenantDashboardCtrl', ['$scope','$rootScope','$timeout',
    function($scope,$rootScope,$timeout) {
       $rootScope.secondaryNav= 'tenant/partials/menu-tenant.tpl.html';

       $scope.time= new Date();

       $timeout(function ()
       {
          $scope.time= new Date();
       },60000);

       $scope.expenses= {
                          upcomingVacancies: 59,
                          rentsPaid: 77,
                          expenseRatio: 90,
                          occupancyRate: 95
                        };


        // @TODO: just here for the demo, but pretty ugly
        var currentMonth = moment().format('YYYY-MM');
        var nextMonth    = moment().add('month', 1).format('YYYY-MM');

        var events = [
            { date: currentMonth + '-' + '10', title: 'Persian Kitten Auction', location: 'Center for Beautiful Cats' },
            { date: currentMonth + '-' + '19', title: 'Cat Frisbee', location: 'Jefferson Park' },
            { date: currentMonth + '-' + '23', title: 'Kitten Demonstration', location: 'Center for Beautiful Cats' },
            { date: nextMonth + '-' + '07',    title: 'Small Cat Photo Session', location: 'Center for Cat Photography' }
          ];

        $('#mini-clndr').clndr({
            daysOfTheWeek: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
            template: $('#mini-clndr-template').html(),
            events: events,
            clickEvents: {
              click: function(target) {
                if(target.events.length) {
                  var daysContainer = $('#mini-clndr').find('.days-container');
                  daysContainer.toggleClass('show-events', true);
                  $('#mini-clndr').find('.x-button').click( function() {
                    daysContainer.toggleClass('show-events', false);
                  });
                }
              }
            },
            adjacentDaysChangeMonth: true
          });

    }
])

.controller('TenantPropertiesCtrl', ['$scope','$rootScope','$routeParams',
    function($scope,$rootScope,$routeParams) {
       $rootScope.secondaryNav= 'tenant/partials/menu-tenant.tpl.html';
    }
])

.controller('TenantProfileCtrl', ['$scope','$rootScope','$routeParams','TopBannerChannel',
    function($scope,$rootScope,$routeParams,TopBannerChannel) {
       $rootScope.secondaryNav= 'tenant/partials/menu-tenant.tpl.html';

       $scope.onFileSelect= function ($files)
       {
            if (!$files[0]) return;

            var file = $files[0];
            var fileReader= new FileReader();
            
            fileReader.onload= function (e)
            {
                $rootScope.profile.picture= e.target.result;
                $scope.$apply();
            };
            
            fileReader.readAsDataURL(file);
       };

       $scope.save= function ()
       {
           $rootScope.profile.$save()
           .then(function ()
           {
                console.log('qui');

                TopBannerChannel.setBanner({
                    content: 'Profile saved!',
                    contentClass: 'success'
                });
           },
           function (err)
           {
                conole.log(err);

                TopBannerChannel.setBanner({
                    content: 'There was an error saving your profile',
                    contentClass: 'error'
                });
           });
       };
    }
])

