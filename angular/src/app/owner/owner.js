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
            authRequired: true,
            templateUrl: 'owner/dashboard.tpl.html',
            controller: 'OwnerDashboardCtrl',
            profileRequired: OWNERS_ONLY
        });

        $routeProvider.when('/owners/properties', {
            authRequired: true,
            templateUrl: 'owner/properties.tpl.html',
            controller: 'OwnerPropertiesCtrl',
            profileRequired: OWNERS_ONLY
        });

        $routeProvider.when('/owners/tenants', {
            authRequired: true,
            templateUrl: 'owner/tenants.tpl.html',
            controller: 'OwnerTenantsCtrl',
            profileRequired: OWNERS_ONLY
        });

        $routeProvider.when('/owners/profile', {
            authRequired: true,
            templateUrl: 'owner/profile.tpl.html',
            controller: 'OwnerProfileCtrl',
            profileRequired: OWNERS_ONLY
        });

        $routeProvider.when('/owners/properties/:id/status', {
            authRequired: true,
            templateUrl: 'owner/property-status.tpl.html',
            controller: 'OwnerPropertyStatusCtrl',
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

.controller('OwnerPropertiesCtrl', ['$scope','$rootScope','$routeParams',
    function($scope,$rootScope,$routeParams) {
       $rootScope.secondaryNav= 'owner/partials/menu-owner.tpl.html';
    }
])

.controller('OwnerTenantsCtrl', ['$scope','$rootScope','$routeParams',
    function($scope,$rootScope,$routeParams) {
       $rootScope.secondaryNav= 'owner/partials/menu-owner.tpl.html';
    }
])

.controller('OwnerProfileCtrl', ['$scope','$rootScope','$routeParams','TopBannerChannel','MAX_UPLOAD_SIZE',
    function($scope,$rootScope,$routeParams,TopBannerChannel,MAX_UPLOAD_SIZE) {
       $rootScope.secondaryNav= 'owner/partials/menu-owner.tpl.html';

       $scope.pictureSelected= function ($files)
       {
            if (!$files[0]) return;

            var file = $files[0];

            console.log(file);

            if (file.size>MAX_UPLOAD_SIZE)
            {
                TopBannerChannel.setBanner({
                    content: 'The picture should be up to 5MB',
                    contentClass: 'error'
                });

                return;
            }

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

.controller('OwnerPropertyStatusCtrl', ['$scope','$rootScope','$routeParams',
    function($scope,$rootScope,$routeParams) {
       $rootScope.secondaryNav= 'owner/partials/menu-owner.tpl.html';


    }
])
