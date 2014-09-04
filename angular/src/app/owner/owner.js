'use strict';

/* Controllers */
angular.module('myApp.owner', ['ngRoute'])

// configure views; the authRequired parameter is used for specifying pages
// which should only be available while logged in
.config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.when('/owners', {
            templateUrl: 'owner/owners.tpl.html',
            profileRequired: function (profile)
            {
                 console.log('owner profile', profile.type);

                 if (profile&&profile.type=='owner')
                 {
                     if (profile.properties)
                       return '/owners/dashboard';
                     else
                       return '/owners/add-property';
                 }
            }
        });

        var OWNERS_ONLY= function (profile)
            {
                 console.log('owners only', profile);

                 if (profile.type!='owner')
                   return '/owners'; 
            };

        $routeProvider.when('/owners/add-property/:step?', {
            authRequired: '/register/owner',
            templateUrl: 'owner/add-property.tpl.html',
            controller: 'AddPropertyCtrl',
            profileRequired: OWNERS_ONLY
        });

        $routeProvider.when('/owners/dashboard', {
            authRequired: '/register/owner',
            templateUrl: 'owner/dashboard.tpl.html',
            controller: 'OwnerDashboardCtrl',
            profileRequired: OWNERS_ONLY
        });
    }
])

.controller('AddPropertyCtrl', ['$scope','$rootScope','$routeParams',
    function($scope,$rootScope,$routeParams) {
       $rootScope.secondaryNav= 'owner/partials/menu-owner.tpl.html';

       var steps= [
                     'owner/partials/property-form.tpl.html',
                     'owner/partials/verify-profile.tpl.html',
                     'owner/partials/ready-to-qualify.tpl.html'
                  ];

       $scope.step= steps[+$routeParams.step-1 || 0];
    }
])

.controller('OwnerDashboardCtrl', ['$scope','$rootScope','$timeout',
    function($scope,$rootScope,$timeout) {
       $rootScope.secondaryNav= 'owner/partials/menu-owner.tpl.html';

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

    }
])
