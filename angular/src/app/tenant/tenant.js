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

       var steps= ['tenant/partials/verify-profile.tpl.html',
                   'tenant/partials/credit-check.tpl.html',
                   'tenant/partials/ready-to-apply.tpl.html'];

       $scope.step= steps[+$routeParams.step-1 || 0];
       $scope.onBoarding= true;
       $scope.shout= {};
    }
])

.controller('TenantDashboardCtrl', ['$scope','$rootScope','$timeout','rentedProfile','tenantService',
    function($scope,$rootScope,$timeout,rentedProfile,tenantService) {
       $rootScope.secondaryNav= 'tenant/partials/menu-tenant.tpl.html';

       $scope.time= new Date();

       $timeout(function ()
       {
          $scope.time= new Date();
       },60000);


       rentedProfile(function (profile)
       {
             tenantService.watchlist(profile.$id).$loaded(function (wl)
             {
                 $scope.watchlist= _.map(_.pluck(wl,'$value'),function ($id) { return { $id: $id }; });
             });
       });

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

.controller('TenantPropertiesCtrl', ['$scope','$rootScope','$routeParams','rentedProfile','tenantService',
    function($scope,$rootScope,$routeParams,rentedProfile,tenantService) {
       $rootScope.secondaryNav= 'tenant/partials/menu-tenant.tpl.html';

         rentedProfile(function (profile)
         {
             tenantService.watchlist(profile.$id).$loaded(function (wl)
             {
                 $scope.watchlist= _.map(_.pluck(wl,'$value'),function ($id) { return { $id: $id }; });
             });
         });
    }
])

.controller('TenantProfileCtrl', ['$scope','$rootScope','$routeParams','TopBannerChannel','MAX_UPLOAD_SIZE','MAX_PROOF_INCOME','shout',
    function($scope,$rootScope,$routeParams,TopBannerChannel,MAX_UPLOAD_SIZE,MAX_PROOF_INCOME,shout) {
       $rootScope.secondaryNav= 'tenant/partials/menu-tenant.tpl.html';

       $scope.page= 1;
       $scope.shout= $scope.shout || {};

       var shouter= shout($scope),
           shoutUpload= shout($scope,'shoutUpload');

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
                shouter
                ({
                    content: 'The picture should be up to 5MB',
                    type: 'danger'
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
           shouter
           ({
                content: 'Saving your profile...',
                type: 'info'
           });

           $rootScope.profile.$save()
           .then(function ()
           {
                shouter
                ({
                    content: 'Profile saved!',
                    type: 'success'
                });
           },
           function (err)
           {
                conole.log(err);

                shouter
                ({
                    content: 'There was an error saving your profile',
                    type: 'danger'
                });
           });
       };

    }
])

.controller('TenantBidCtrl', ['$scope','$rootScope','$location','$routeParams','TopBannerChannel','tenantService','rentedProfile','propertyService',
    function($scope,$rootScope,$location,$routeParams,TopBannerChannel,tenantService,rentedProfile,propertyService)
{
     var watchlist;

     rentedProfile(function (profile)
     {
         $scope.gotProfile= true;
         watchlist= $scope.watchlist= tenantService.watchlist(profile.$id);
     });

     var inWatchlist= $scope.inWatchlist= function (property)
     {
       return watchlist&&_.findWhere(watchlist,{ $value: property.$id });
     };
     
     $scope.property.$loaded(function ()
     {
         var property= $scope.property;

         $scope.bid= { 
                      rentAmount: property.targetRent,
                      moveInDate: property.availableDate,
                       leaseTerm: +property.leaseTerm
                     };

         $scope.terms= [
                          { months: 1, desc: 'Month-to-month' },
                          { months: 12, desc: '1 year' },
                          { months: 24, desc: '2 years' },
                          { months: 36, desc: '3 years' }
                       ];

         $scope.terms= _.filter($scope.terms,function (t)
                       {
                           if (property.leaseTerm==1)
                             return t.months==1; 
                           else
                             return t.months>1&&t.months<=property.leaseTerm; 
                       });

     });

     $scope.watch= function (property)
     {
           var _watch= function ()
               {
                   if (!inWatchlist(property))
                     watchlist.$add(property.$id)
                       .then(function ()
                       {
                            TopBannerChannel.setBanner
                            ({
                                content: 'Property added to your watchlist!',
                                type: 'success'
                            });
                       },
                       function (err)
                       {
                            conole.log(err);

                            TopBannerChannel.setBanner
                            ({
                                content: 'There was an error adding the property to your watchlist',
                                type: 'danger'
                            });
                       });
               };

           if (!$rootScope.profile) // logged out
           {
                $rootScope.trackAddToWatchlist= _watch;
                $location.path('/tenants/on-boarding');
           }
           else
              _watch();
     };

     $scope.unwatch= function (property)
     {
           var record= _.findWhere(watchlist,{ $value: property.$id });

           watchlist.$remove(record)
           .then(function ()
           {
                TopBannerChannel.setBanner
                ({
                    content: 'Property removed from your watchlist!',
                    type: 'success'
                });
           },
           function (err)
           {
                conole.log(err);

                TopBannerChannel.setBanner
                ({
                    content: 'There was an error removing the property from your watchlist',
                    type: 'danger'
                });
           });
     };

     $scope.makeAnOffer= function (bid,property)
     {
           var _bid= function ()
               {
                   propertyService.placeBid(property.$id, $rootScope.profile.$id, bid,
                   function (err)
                   {
                        if (err)
                        {
                            console.log(err);

                            TopBannerChannel.setBanner
                            ({
                                content: 'There was an error submitting your bid',
                                type: 'danger'
                            });
                        }
                        else
                            TopBannerChannel.setBanner
                            ({
                                content: 'Offer submitted!',
                                type: 'success'
                            });

                        $rootScope.$apply(); // TopBannerChannel.setBanner does not apply...
                   }); 
               };

           if (!$rootScope.profile) // logged out
           {
                $rootScope.trackBid= _bid;
                $location.path('/tenants/on-boarding');
           }
           else
              _bid();
     };
}])
