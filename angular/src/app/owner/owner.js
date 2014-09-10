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

        $routeProvider.when('/owners/properties/:id/edit', {
            authRequired: true,
            templateUrl: 'owner/edit-property.tpl.html',
            controller: 'OwnerPropertyCtrl',
            profileRequired: OWNERS_ONLY
        });
    }
])

.controller('AddPropertyCtrl', ['$scope','$rootScope','$routeParams','propertyService','shout','rentedProfile',
    'MAX_PROPERTY_PICTURES','MAX_UPLOAD_SIZE',
    function($scope,$rootScope,$routeParams,propertyService,shout, rentedProfile, MAX_PROPERTY_PICTURES, MAX_UPLOAD_SIZE) {

       var steps= [
                     'owner/partials/property-form.tpl.html',
                     'owner/partials/verify-profile.tpl.html',
                     'owner/partials/ready-to-qualify.tpl.html'
                  ];

       $scope.step= steps[+$routeParams.step-1 || 0];
       $scope.add= true;
       $scope.shout= {};

       rentedProfile(function (profile)
       {
           $scope.propertyNo= (profile.properties || []).length+1;
       });
}])

.controller('OwnerPropertyCtrl', ['$scope','$rootScope','$routeParams','$location','propertyService','shout',
    'MAX_PROPERTY_PICTURES','MAX_UPLOAD_SIZE','TopBannerChannel','IMAGE_COMPRESSION',
    function($scope,$rootScope,$routeParams,$location,propertyService,shout, MAX_PROPERTY_PICTURES, MAX_UPLOAD_SIZE, TopBannerChannel,IMAGE_COMPRESSION) {

       $scope.shout= $scope.shout || {};

       var states= $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

       $scope.statesPattern= '/^('+states.join('|')+')$/'

       var shouter= shout($scope),
           shoutUpload= shout($scope,'shoutUpload');

       $scope.property= $routeParams.id ? propertyService.fetch($routeParams.id) : propertyService.create();

       $scope.removePicture= function (selected)
       {
           if (!confirm('You want to remove this picture?')) return;

           _.rm($scope.property.pictures,selected);
       };

       $scope.pictureSelected= function ($files)
       {
            console.log($files);
            $scope.property.pictures= $scope.property.pictures || [];

            if (($files.length+$scope.property.pictures.length)>MAX_PROPERTY_PICTURES)
            {
                shoutUpload
                ({
                    content: 'You can upload up to '+MAX_PROPERTY_PICTURES+' pictures',
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
                        content: 'Pictures should be up to 5MB, file '+
                                 file.name+' is '+(file.size/1024/1024)+'MB',
                        type: 'danger'
                    });

                    return;
                }

                var fileReader= new FileReader();
                
                fileReader.onload= function (e)
                {
                    var img = new Image,
                        target= img.src = e.target.result;

                    if (_.contains(['image/png','image/jpeg','image/jpg'],file.type))
                      target= jic.compress(img,IMAGE_COMPRESSION,file.type.indexOf('image/png')==0 ? 'png' : 'jpg').src;

                    console.log(target.length<img.src.length,img.src.length,target.length);

                    $scope.property.pictures.push(target);
                    $scope.$apply();
                };
                
                fileReader.readAsDataURL(file);

            });
       };

       $scope.remove= function (property)
       {
            var handleErrors= function (err)
            {
                console.log(err);

                shouter
                ({
                    content: 'There was an error saving your property',
                    type: 'danger'
                });
            };

            if (!confirm('You want to remove this property?')) return;

            _.rm($rootScope.profile.properties,property.$id);

            $rootScope.profile.$save().then(function ()
            {
                property.$inst().$remove().then(function ()
                {
                    TopBannerChannel.setBanner({
                        content: 'Property removed!',
                        contentClass: 'success'
                    });

                    $location.path('/owners/properties');
                },handleErrors);
            },
            handleErrors);
       };

       $scope.minDate= moment().format('YYYY-MM-DD');

       $scope.open = function($event)
       {
           $event.preventDefault();
           $event.stopPropagation();

           $scope.opened= true;
       };

       $scope.save= function (property)
       {
           $scope.showErrors= false;

           if ($scope.propertyForm.$invalid)
           {
              $scope.showErrors= true;

              shouter
              ({
                    content: 'Please correct the highlighted fields',
                    type: 'danger'
              });

              return;
           } 

           if (!property.pictures||property.pictures.length<1)
           {
              $scope.showErrors= true;

              shouter
              ({
                    content: 'Please upload at least one picture of your property',
                    type: 'danger'
              });

              return;
           }


           var handleErrors= function (err)
           {
                console.log(err);

                shouter
                ({
                    content: 'There was an error saving your property',
                    type: 'danger'
                });
           };

           shouter
           ({
                content: 'Saving your property...',
                type: 'info'
           });

           if (!$routeParams.id)
           {
               property.owner= $rootScope.profile.$id;
               property.$priority= new Date().getTime();
           }

           property.leaseTerm= Number(property.leaseTerm || 0);

           property.$save()
           .then(function ()
           {
                var props= $rootScope.profile.properties= $rootScope.profile.properties || [];

                if (!_.contains(props,property.$id))
                {
                    props.push(property.$id);

                    $rootScope.profile.$save().then(function ()
                    {
                        $rootScope.addedPropertyId= property.$id;

                        shouter
                        ({
                            content: 'Property saved!',
                            type: 'success'
                        });
                    },
                    handleErrors);
                }
                else
                shouter
                ({
                    content: 'Property saved!',
                    type: 'success'
                });
           },
           handleErrors);
       };
    }
])

.controller('OwnerDashboardCtrl', ['$scope','$rootScope','$timeout','rentedProfile','propertyService',
    function($scope,$rootScope,$timeout,rentedProfile,propertyService) {

       $scope.time= new Date();

       $timeout(function ()
       {
          $scope.time= new Date();
       },60000);

       $scope.monthlyIncome= 0;
       $scope.activeProperties= 0;
       $scope.offersNo= 0;

       var properties= {};
       
       rentedProfile(function (profile)
       {
             propertyService.fetchRecentlyBiddedProperties(profile.$id,4)
                .$inst().$ref().on('value',function (data)
                { 
                    $scope.properties= _.map(_.keys(data.val()),function ($id) { return { $id: $id }; });
                });

            profile.$inst().$ref().on('value',function (data)
            {
               $scope.monthlyIncome= 0;
               $scope.activeProperties= 0;
               $scope.offersNo= 0;
               properties= {};
               $scope.props= _.map(data.val().properties,function ($id) { return { $id: $id }; });
            });
       });

       // overshooting the filter but... in hurry!
       $scope.intercept= function (property)
       {
           if (properties[property.$id]||!property.bids) return '';

           if (property.tenant)
           {
               if (!property.bestOffer) return; 
               $scope.monthlyIncome+= property.bestOffer.rentAmount;
           }
           else
           {
               $scope.activeProperties++;
               $scope.offersNo+= property.bids ? property.bids.length : 0;
           }

           properties[property.$id]= true;

           return '';
       };

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

.controller('OwnerPropertiesCtrl', ['$scope','$rootScope','$routeParams','rentedProfile',
    function($scope,$rootScope,$routeParams,rentedProfile,firebaseRef) {

        rentedProfile(function (profile)
        {
            profile.$inst().$ref().on('value',function (data)
            {
               $scope.properties= _.map(data.val().properties,function ($id) { return { $id: $id }; });
            });
        });
    }
])

.controller('OwnerTenantsCtrl', ['$scope','$rootScope','$routeParams','$modal','rentedProfile',
    function($scope,$rootScope,$routeParams,$modal,rentedProfile) {

       $scope.monthlyIncome= 0;

       var properties= {};
       
       // overshooting the filter but... in hurry!
       $scope.income= function (property)
       {
           if (!properties[property.$id]&&property.bestOffer)
           {
             $scope.monthlyIncome= ($scope.monthlyIncome+property.bestOffer.rentAmount);
             properties[property.$id]= true;
           }

           return '';
       };

       $scope.tenantDetails= function (property)
       {
            $modal.open
            ({
                templateUrl: 'owner/tenant-details.tpl.html',
                controller: 'OwnerTenantCtrl',
                size: 'lg',
                resolve: {  
                           property: function () { return property; }
                         }
            });
       };


        rentedProfile(function (profile)
        {
            profile.$inst().$ref().on('value',function (data)
            {
               $scope.monthlyIncome= 0;
               properties= {};
               $scope.properties= _.map(data.val().properties,function ($id) { return { $id: $id }; });
            });
        });
    }
])

.controller('OwnerProfileCtrl', ['$scope','$rootScope','$routeParams','TopBannerChannel','MAX_UPLOAD_SIZE','loginService',
    function($scope,$rootScope,$routeParams,TopBannerChannel,MAX_UPLOAD_SIZE,loginService) {

       var states= $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

       $scope.statesPattern= '/^('+states.join('|')+')$/'

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

       $scope.save= function (profile,password)
       {
           $scope.showErrors= false;

           if ($scope.profileForm.$invalid)
           {
              $scope.showErrors= true;

              TopBannerChannel.setBanner({
                  content: 'Please correct the highlighted fields',
                  contentClass: 'danger'
              });

              return;
           } 

           password= password || {};

           if (password.change&&password.change!=password.confirmChange)
           {
              TopBannerChannel.setBanner({
                  content: 'The password and confirm does not match',
                  contentClass: 'danger'
              });

              return;
           }

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

                                    TopBannerChannel.setBanner({
                                        content: 'There was an error changing your password',
                                        contentClass: 'danger'
                                    });
                              }
                              else
                              {
                                $scope.password= null;

                                TopBannerChannel.setBanner({
                                    content: 'Profile saved!',
                                    contentClass: 'success'
                                });
                              }
                      }
                   });
                else
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

.controller('OwnerPropertyStatusCtrl', ['$scope','$rootScope','$routeParams','$modal','propertyService','TopBannerChannel',
    function($scope,$rootScope,$routeParams,$modal,propertyService,TopBannerChannel) {

       $scope.property= propertyService.fetchWithBids($routeParams.id);

       $scope.bidDetails= function (bid,property)
       {
            $modal.open
            ({
                templateUrl: 'owner/bid-details.tpl.html',
                controller: 'OwnerBidCtrl',
                size: 'lg',
                resolve: {  
                           bid: function () { return bid; },
                           property: function () { return property; }
                         }
            });
       };

       $scope.acceptOffer= function (bid,property)
       {
            if (!confirm('Please confirm that you would like to accept '+bid.user.firstName
                         +' '+bid.user.lastName+' as your tenant.')) return;

            propertyService.acceptBid(bid,property,function (err)
            {
                if (err)
                {
                    console.log(err);

                    TopBannerChannel.setBanner({
                        content: 'There was an error accepting this offer',
                        contentClass: 'danger'
                    });
                }
                else
                    TopBannerChannel.setBanner({
                        content: 'Offer accepted!',
                        contentClass: 'success'
                    });
            });
       };

       $scope.cancelOffer= function (bid,property)
       {
            if (!confirm('Please confirm that you would like to reopen the bidding')) return;

            propertyService.cancelAcceptBid(bid,property,function (err)
            {
                if (err)
                {
                    console.log(err);

                    TopBannerChannel.setBanner({
                        content: 'There was an error reopening the bidding',
                        contentClass: 'danger'
                    });
                }
                else
                    TopBannerChannel.setBanner({
                        content: 'Offer canceled!',
                        contentClass: 'success'
                    });
            });
       };

       $scope.tenantMoveIn= function (user,property)
       {
            if (!confirm('Please confirm that '+user.firstName
                         +' '+user.lastName+' has moved in.')) return;

            propertyService.tenantMoveIn(user,property,function (err)
            {
                if (err)
                {
                    console.log(err);

                    TopBannerChannel.setBanner({
                        content: 'There was an error saving the tenant',
                        contentClass: 'danger'
                    });
                }
                else
                    TopBannerChannel.setBanner({
                        content: 'Tenant moved in!',
                        contentClass: 'success'
                    });
            });
       };

       $scope.cancelMoveIn= function (user,property)
       {
            if (!confirm('Please confirm that '+user.firstName
                         +' '+user.lastName+' has not moved in.')) return;

            propertyService.cancelTenantMoveIn(user,property,function (err)
            {
                if (err)
                {
                    console.log(err);

                    TopBannerChannel.setBanner({
                        content: 'There was an error canceling the tenant',
                        contentClass: 'danger'
                    });
                }
                else
                    TopBannerChannel.setBanner({
                        content: 'Tenant canceled!',
                        contentClass: 'success'
                    });
            });
       };
    }
])

.controller('OwnerBidCtrl', ['$scope','$rootScope','$routeParams','$modalInstance','propertyService','bid','property',
    function($scope,$rootScope,$routeParams,$modalInstance,propertyService,bid,property) 
{
  $scope.property= property;
  $scope.bid= bid;

  $scope.cancel= function ()
  {
     $modalInstance.dismiss('cancel');
  };
}])

.controller('OwnerTenantCtrl', ['$scope','$modalInstance','property',
    function($scope,$modalInstance,property) 
{
  $scope.property= property;

  $scope.cancel= function ()
  {
     $modalInstance.dismiss('cancel');
  };
}]);
