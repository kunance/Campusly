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

.controller('TenantProfileCtrl', ['$scope','$rootScope','$routeParams','TopBannerChannel','MAX_UPLOAD_SIZE','MAX_PROOF_INCOME','shout',
    function($scope,$rootScope,$routeParams,TopBannerChannel,MAX_UPLOAD_SIZE,MAX_PROOF_INCOME,shout) {
       $rootScope.secondaryNav= 'tenant/partials/menu-tenant.tpl.html';

       $scope.page= 1;

       var shoutUpload= shout($scope,'shoutUpload');

       $scope.proofSelected= function ($files,profile)
       {
            console.log($files);

            profile.financial= profile.financial || {};

            profile.financial.proofsOfIncome= profile.financial.proofsOfIncome || [];

            if (($files.length+profile.financial.proofsOfIncome.length)>MAX_PROOF_INCOME)
            {
                shoutUpload
                ({
                    content: 'You can upload up to '+MAX_PROOF_INCOME+' documents',
                    type: 'danger'
                });

                return;
            }

            _.each($files,function (file)
            {
                if (file.size>MAX_UPLOAD_SIZE)
                {
                    shoutUpload
                    ({
                        content: 'Documents should be up to 5MB, file '+
                                 file.name+' is '+(file.size/1024/1024)+'MB',
                        type: 'danger'
                    });

                    return;
                }

                var fileReader= new FileReader();
                
                fileReader.onload= function (e)
                {
                    profile.financial.proofsOfIncome.push({ name: file.name, data: e.target.result, size: file.size });
                    $scope.$apply();
                };
                
                fileReader.readAsDataURL(file);

            });
       };

       $scope.pictureSelected= function ($files)
       {
            if (!$files[0]) return;

            var file = $files[0];

            console.log(file);

            if (file.size>MAX_UPLOAD_SIZE)
            {
                TopBannerChannel.setBanner({
                    content: 'The picture should be up to 5MB',
                    contentClass: 'danger'
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

       $scope.removeProofOfIncome= function (file,profile)
       {
           if (!confirm('You want to remove this document?')) return;

          _.rm(profile.financial.proofsOfIncome,file);
       };

       $scope.save= function ()
       {
           TopBannerChannel.setBanner({
                content: 'Saving your profile...',
                contentClass: 'info'
           });

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
                    contentClass: 'danger'
                });
           });
       };

    }
])

.controller('TenantBidCtrl', ['$scope','$rootScope','$location','$routeParams',
    function($scope,$rootScope,$location,$routeParams)
{
     
     $scope.property.$loaded(function ()
     {
         $scope.bid= { price: $scope.property.targetRent, movein: moment().add(30,'days').format('YYYY-MM-DD') };
     });

     $scope.watch= function (property)
     {
           if (!$rootScope.profile) // logged out
           {
                $rootScope.trackAddToWatchlist= property;
                $location.path('/tenants/on-boarding');
           }
           else
           {
           }
     };

     $scope.makeAnOffer= function (bid,property)
     {
           if (!$rootScope.profile) // logged out
           {
                $rootScope.trackBid= { bid: bid, property: property };
                $location.path('/tenants/on-boarding');
           }
           else
           {
           }
     };
}])
