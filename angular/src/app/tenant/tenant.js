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
