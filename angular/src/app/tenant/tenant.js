'use strict';


     var unwatch= function (property,watchlist,TopBannerChannel,mailService,$rootScope,propertyService)
     {
           var record= _.findWhere(watchlist,{ $value: property.$id });

           watchlist.$remove(record)
           .then(function ()
           {
                propertyService.removeWatcher(property.$id,$rootScope.profile.$id,
                function (err)
                {
                    if (err)
                    {
                        conole.log(err);

                        TopBannerChannel.setBanner
                        ({
                            content: 'There was an error removing the property from your watchlist',
                            type: 'danger'
                        });
                    }
                    else
                    {
                        TopBannerChannel.setBanner
                        ({
                            content: 'Property removed from your watchlist!',
                            type: 'success'
                        });

                        mailService.send($rootScope.profile.$id,
                                         'tenant-property-unwatch',
                                         { propertyname: property.address.street });
                    }
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


/* Controllers */
angular.module('myApp.tenant', ['ngRoute'])

// configure views; the authRequired parameter is used for specifying pages
// which should only be available while logged in
.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

        $routeProvider.when('/tenants', {
            templateUrl: 'tenant/tenants.tpl.html',
            profileRequired: function (profile)
            {
                 if (profile&&profile.type=='tenant')
                 {
                 //    if (profile.completedOnBoarding)
                       return '/tenants/dashboard';
                  //   else
                  //     return '/tenants/myprofile';
                 }
            }
        });

        var TENANTS_ONLY= function (profile)
            {
                 console.log('tenants only', profile);

                 if (profile.type!='tenant')
                   return '/tenants'; 
            };

        $routeProvider.when('/tenants/myprofile/:step?', {
            authRequired: '/register/tenant',
            templateUrl: 'tenant/myprofile.tpl.html',
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

        /* Hiding profile edit field
        $routeProvider.when('/tenants/profile', {
            authRequired: true,
            templateUrl: 'tenant/profile.tpl.html',
            controller: 'TenantProfileCtrl',
            profileRequired: TENANTS_ONLY
        });
        */
        
        $locationProvider.html5Mode(true);
        
    }
])

.controller('OnBoardingCtrl', ['$scope','$rootScope','$location','$routeParams',
    function($scope,$rootScope,$location,$routeParams) {

       var steps= ['tenant/partials/verify-profile.tpl.html',
                   'tenant/partials/credit-check.tpl.html',
                   'tenant/partials/ready-to-apply.tpl.html'];

       $scope.step= steps[+$routeParams.step-1 || 0];
       $scope.onBoarding= true;
       $scope.shout= {};
    }
])

.controller('TenantDashboardCtrl', ['$scope','$rootScope','$timeout','$modal','rentedProfile','tenantService','propertyService',
    function($scope,$rootScope,$timeout,$modal,rentedProfile,tenantService,propertyService) {

       $scope.time= new Date();

       $timeout(function ()
       {
          $scope.time= new Date();
       },60000);

       $scope.accepted= function (property)
       {
            $modal.open
            ({
                templateUrl: 'tenant/owner-details.tpl.html',
                controller: 'TenantOwnerCtrl',
                size: 'lg',
                resolve: {  
                           property: function () { return property; }
                         }
            });
       };

       var properties= {};

       $scope.offersNo= 0;

       $scope.isAccepted= function (property,profile)
       {
          if (!property.bestOffer) return false;
          if (!profile) return false;
          if (properties[property.$id]!==undefined) return properties[property.$id];

          
          var accepted= properties[property.$id]= (property.bestOffer.userId==profile.$id
                                                   &&!!property.bestOffer.accepted);

          if (!accepted&&!property.bestOffer.accepted)
            $scope.offersNo++;
            
          return accepted;
       };

       rentedProfile(function (profile)
       {
             tenantService.watchlist(profile.$id)
                .$inst().$ref().on('value',function (data)
             {
                 $scope.watchlist= _.map(data.val(),function ($id) { return { $id: $id }; });
             });

             propertyService.fetchRecentlyBiddedProperties(profile.$id,4)
                .$inst().$ref().on('value',function (data)
                { 
                    properties= {};
                    $scope.offersNo= 0;
                    $scope.properties= _.map(_.keys(data.val()),function ($id) { return { $id: $id }; });
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

.controller('TenantPropertiesCtrl', ['$scope','$rootScope','$routeParams','rentedProfile','tenantService','propertyService','TopBannerChannel','mailService',
    function($scope,$rootScope,$routeParams,rentedProfile,tenantService,propertyService,TopBannerChannel,mailService) {

      var watchlist;

         rentedProfile(function (profile)
         {
             (watchlist=tenantService.watchlist(profile.$id))
                .$inst().$ref().on('value',function (data)
             {
                 $scope.watchlist= _.map(_.values(data.val(),'$value'),function ($id) { return { $id: $id }; });
             });

             propertyService.fetchRecentlyBiddedProperties(profile.$id,4)
                .$inst().$ref().on('value',function (data)
                { 
                    $scope.properties= _.map(_.keys(data.val()),function ($id) { return { $id: $id }; });
                });
         });

     $scope.unwatch= function (property)
     {
         unwatch(property,watchlist,TopBannerChannel,mailService,$rootScope,propertyService);
     };

     $scope.cancelBid= function (property)
     {
            if (!confirm('Please confirm that you would like to retire your offer')) return;

            var bid= _.findWhere(property.bids,{ userId: $rootScope.profile.$id });

            if (bid)
            propertyService.cancelBid(bid,property,function (err)
            {
                if (err)
                {
                    console.log(err);

                    TopBannerChannel.setBanner({
                        content: 'There was an error deleting your offer',
                        contentClass: 'danger'
                    });
                }
                else
                {
                    TopBannerChannel.setBanner({
                        content: 'Offer retired!',
                        contentClass: 'success'
                    });

                    mailService.send(property.owner,
                                     'owner-offer-deleted',
                                     { propertyname: property.address.street });
                }
            });
     };

    }
])

.controller('TenantProfileCtrl', ['$scope','$rootScope','$routeParams','TopBannerChannel','MAX_UPLOAD_SIZE','MAX_PROOF_INCOME','shout','loginService','compressImage','mailService',
    function($scope,$rootScope,$routeParams,TopBannerChannel,MAX_UPLOAD_SIZE,MAX_PROOF_INCOME,shout,loginService,compressImage,mailService) {

       $scope.password= {};
       $scope.page= 1;
       $scope.shout= $scope.shout || {};

       var shouter= shout($scope),
           shoutUpload= shout($scope,'shoutUpload');

       var states= $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

       $scope.statesPattern= '/^('+states.join('|')+')$/'


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
                $rootScope.profile.picture= compressImage(file.type,e.target.result);
                $scope.$apply();
            };
            
            fileReader.readAsDataURL(file);
       };

       $scope.removeProofOfIncome= function (file,profile)
       {
           if (!confirm('You want to remove this document?')) return;

          _.rm(profile.financial.proofsOfIncome,file);
       };

       $scope.save= function (profile,password)
       {
           $scope.showErrors= false;

           if ($scope.profileForm.$invalid)
           {
              $scope.showErrors= true;

              shouter
              ({
                    content: 'Please correct the highlighted fields on page 1 and 2',
                    type: 'danger'
              });

              return;
           } 

         //Commented out the proof of income requirement for now
         /*  if (!profile.financial||!profile.financial.proofsOfIncome||profile.financial.proofsOfIncome.length<1)
           {
              $scope.showErrors= true;

              shouter
              ({
                    content: 'Please upload at least one proof of income',
                    type: 'danger'
              });

              return;
           }*/

           password= password || {};

           if (password.change&&password.change!=password.confirmChange)
           {
              TopBannerChannel.setBanner({
                  content: 'The password and confirm does not match',
                  contentClass: 'danger'
              });

              return;
           }

           shouter
           ({
                content: 'Saving your profile...',
                type: 'info'
           });

           profile.completedOnBoarding= true;

           var success= function ()
               {
                    shouter
                    ({
                        content: 'Profile saved!',
                        type: 'success'
                    });

                    mailService.send(profile.$id,
                                     'tenant-profile-updated',
                                     { fname: profile.firstName });
               };

           profile.$save()
           .then(function ()
           {
                if (password.change)
                  loginService.changePassword
                  ({
                      email: profile.authEmail,

                      oldpass: password.old,

                      newpass: password.change,

                      confirm: password.confirmChange,

                      callback: function (err)
                      {
                              if (err)
                              {
                                    console.log(err);

                                    shouter
                                    ({
                                        content: 'There was an error changing your password',
                                        type: 'danger'
                                    });
                              }
                              else
                              {
                                password.old = password.change = password.confirmChange= null;
                                
                                success();
                              }
                      }
                   });
                else
                   success();

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

.controller('TenantBidCtrl', ['$scope','$rootScope','$location','$routeParams','TopBannerChannel','tenantService','rentedProfile','propertyService','mailService',
    function($scope,$rootScope,$location,$routeParams,TopBannerChannel,tenantService,rentedProfile,propertyService,mailService)
{
     var watchlist;

     rentedProfile(function (profile)
     {
         $scope.gotProfile= true;
         watchlist= $scope.watchlist= profile ? tenantService.watchlist(profile.$id) : [];
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

     var checkForMyOffer= _.debounce(function ()
         {
             if (!$rootScope.profile) return;

             var mine= _.findWhere($scope.property.bids,{ userId: $rootScope.profile.$id });

             if (mine)
             {
               $scope.bid= mine;
               $scope.$apply();
             }
         },200);

     $scope.$watch('property.bids[0].userId',function (bids)
     {
         if (bids)
           checkForMyOffer();
     });

     $scope.watch= function (property)
     {
           var _watch= function ()
               {
                   if (!inWatchlist(property))
                     watchlist.$add(property.$id)
                       .then(function ()
                       {
                            propertyService.addWatcher(property.$id, $rootScope.profile.$id,
                            function (err)
                            {
                                if (err)
                                {
                                    conole.log(err);

                                    TopBannerChannel.setBanner
                                    ({
                                        content: 'There was an error adding the property to your watchlist',
                                        type: 'danger'
                                    });
                                }
                                else
                                {
                                    TopBannerChannel.setBanner
                                    ({
                                        content: 'Property added to your watchlist!',
                                        type: 'success'
                                    });

                                    mailService.send(property.owner,
                                                     'owner-property-watched',
                                                     { propertyname: property.address.street,
                                                         propertyid: property.$id });

                                    mailService.send($rootScope.profile.$id,
                                                     'tenant-property-watch',
                                                     { propertyname: property.address.street,
                                                         propertyid: property.$id });
                                }
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
                $location.path('/tenants/myprofile');
           }
           else
              _watch();
     };

     $scope.unwatch= function (property)
     {
         unwatch(property,watchlist,TopBannerChannel,mailService,$rootScope,propertyService);
     };


     $scope.makeAnOffer= function (bid,property)
     {
           var _bid= function ()
               {
                   propertyService.placeBid(property.$id, property.owner, $rootScope.profile.$id, bid,
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
                        {
                            TopBannerChannel.setBanner
                            ({
                                content: 'Offer submitted!',
                                type: 'success'
                            });

                            mailService.send(property.owner,
                                             'owner-offer-created',
                                             { propertyname: property.address.street });
                        }

                        $rootScope.$apply(); // TopBannerChannel.setBanner does not apply...
                   }); 
               };

           if (!$rootScope.profile) // logged out
           {
                $rootScope.trackBid= _bid;
                $location.path('/tenants/myprofile');
           }
           else
              _bid();
     };


     $scope.editMyBid= function (bid,property)
     {
            if (!confirm('Please confirm that you would like to change your offer')) return;

            propertyService.editBid(_.omit(bid,['$$hashKey','user']),property,function (err)
            {
                if (err)
                {
                    console.log(err);

                    TopBannerChannel.setBanner({
                        content: 'There was an error changing your offer',
                        contentClass: 'danger'
                    });
                }
                else
                {
                    TopBannerChannel.setBanner({
                        content: 'Offer changed!',
                        contentClass: 'success'
                    });

                    mailService.send(property.owner,
                                     'owner-offer-updated',
                                     { propertyname: property.address.street });

                }
            });
     };

     $scope.open = function($event)
     {
         $event.preventDefault();
         $event.stopPropagation();
  
         $scope.opened= true;
     };
}])

.controller('TenantOwnerCtrl', ['$scope','$modalInstance','property','syncData',
    function($scope,$modalInstance,property,syncData) 
{
  $scope.property= property;

  $scope.owner= syncData('users/'+property.owner).$asObject();

  $scope.cancel= function ()
  {
     $modalInstance.dismiss('cancel');
  };
}]);
