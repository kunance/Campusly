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

.controller('AddPropertyCtrl', ['$scope','$rootScope','$routeParams','propertyService','shout',
    'MAX_PROPERTY_PICTURES','MAX_UPLOAD_SIZE',
    function($scope,$rootScope,$routeParams,propertyService,shout, MAX_PROPERTY_PICTURES, MAX_UPLOAD_SIZE) {
       $rootScope.secondaryNav= 'owner/partials/menu-owner.tpl.html';

       var steps= [
                     'owner/partials/property-form.tpl.html',
                     'owner/partials/verify-profile.tpl.html',
                     'owner/partials/ready-to-qualify.tpl.html'
                  ];

       $scope.step= steps[+$routeParams.step-1 || 0];
       $scope.add= true;
       $scope.shout= {};
}])

.controller('OwnerPropertyCtrl', ['$scope','$rootScope','$routeParams','$location','propertyService','shout',
    'MAX_PROPERTY_PICTURES','MAX_UPLOAD_SIZE','TopBannerChannel',
    function($scope,$rootScope,$routeParams,$location,propertyService,shout, MAX_PROPERTY_PICTURES, MAX_UPLOAD_SIZE, TopBannerChannel) {
       $rootScope.secondaryNav= 'owner/partials/menu-owner.tpl.html';

       $scope.shout= $scope.shout || {};

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
                    $scope.property.pictures.push(e.target.result);
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

       $scope.save= function (property)
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

           property.leaseTerm= Number(property.leaseTerm);

           property.$save()
           .then(function ()
           {
                var props= $rootScope.profile.properties= $rootScope.profile.properties || [];

                if (!_.contains(props,property.$id))
                {
                    props.push(property.$id);

                    $rootScope.profile.$save().then(function ()
                    {
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

.controller('OwnerDashboardCtrl', ['$scope','$rootScope','$timeout','rentedProfile',
    function($scope,$rootScope,$timeout,rentedProfile) {
       $rootScope.secondaryNav= 'owner/partials/menu-owner.tpl.html';

       $scope.time= new Date();

       $timeout(function ()
       {
          $scope.time= new Date();
       },60000);

       rentedProfile(function ()
       {
          $scope.properties= _.map($rootScope.profile.properties,function ($id) { return { $id: $id }; });
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

.controller('OwnerPropertiesCtrl', ['$scope','$rootScope','$routeParams',
    function($scope,$rootScope,$routeParams) {
        $rootScope.secondaryNav= 'owner/partials/menu-owner.tpl.html';

        console.log($rootScope.profile.properties);

        $scope.properties= _.map($rootScope.profile.properties,function ($id) { return { $id: $id }; });
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
                    contentClass: 'danger'
                });
           });
       };
    }
])

.controller('OwnerPropertyStatusCtrl', ['$scope','$rootScope','$routeParams','propertyService',
    function($scope,$rootScope,$routeParams,propertyService) {
       $rootScope.secondaryNav= 'owner/partials/menu-owner.tpl.html';

       $scope.property= propertyService.fetchWithBids($routeParams.id);
    }
])
