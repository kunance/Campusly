'use strict';

/* Controllers */
angular.module('myApp.property', ['ngRoute'])

// configure views; the authRequired parameter is used for specifying pages
// which should only be available while logged in
.config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.when('/property/:property_id', {
            templateUrl: 'property/details.tpl.html',
            controller: 'PropertyDetailsCtrl'
        });

        $routeProvider.when('/properties', {
            templateUrl: 'property/list.tpl.html',
            controller: 'PropertyListCtrl'
        });

    }
])

.controller('PropertyListCtrl', ['$scope', 'propertyService',
    function($scope, propertyService, $filter) {

        var featured= propertyService.featured().$asArray();

        featured.$inst().$ref().on('value',function (data)
        { 
            $scope.properties= _.map(data.val(),function ($id) { return { $id: $id }; });
        });
    }
])

.filter('loadProperty', ['propertyService',
function (propertyService)
{
    return function (featured)
    {
        featured= featured || [];

        featured.forEach(function (property,idx)
        {
            if (_.keys(property).length>1) return;

            var obj= propertyService.fetch(property.$id).$asObject();
                
            property.bids= propertyService.fetchBids(property.$id,3).$asArray();
            
            obj.$inst().$ref().on('value',function (data)
            { 
                _.extend(property,data.val());
            });
        });

        return featured;
    };
}])

.controller('PropertyDetailsCtrl', ['$scope', '$rootScope', '$routeParams', 'propertyService', '$filter', '$timeout', '$interval', '$location', '$modal',
    function($scope, $rootScope, $routeParams, propertyService, $filter, $timeout, $interval, $location, $modal) {

        var countdownTimer;

        $scope.property_id = $routeParams.property_id;
        $scope.isActive = propertyService.isActive;
        $scope.getStatus = propertyService.getStatus;
        $scope.bid = {};
        $scope.countdown = "";
        $scope.leaseTerms = {"1 year" : "12"};
        //get the property
        $scope.property= propertyService.fetch($routeParams.property_id).$asObject();

        $scope.$watch('property', function(newvalue, oldvalue) {            
            $scope.setCountdown();
            if (newvalue && newvalue.bids) {
                var bids = {};
                angular.forEach(newvalue.bids, function(pbids, user) {
                    angular.forEach(pbids, function(bid, id) {
                        this[user] = bid;
                    }, bids);
                });

                $scope.bids = [];
                angular.forEach(bids, function(bid, id) {
                    this.push(bid);
                }, $scope.bids);                
            }

            if(newvalue.leaseTerm){
                var numberOfYears = parseInt(newvalue.leaseTerm)/12;

                for(var y=1; y<=numberOfYears; y++){
                    $scope.leaseTerms[y+" year"+((y>1)?"s":"")] = y*12;
                }
            }
        });

        $scope.stopCountdown = function(){
            if (angular.isDefined(countdownTimer)) {
                $interval.cancel(countdownTimer);
                countdownTimer = undefined;
            }
        };

        $scope.setCountdown = function() {                           

            if ($scope.property && $scope.property.endDate) {

                countdownTimer = $interval(function() {

                    var then = moment($scope.property.endDate),
                        now = moment(),
                        ms = then.diff(now);                   

                    if (ms <= 0) {
                        $scope.isActive = propertyService.isActive;
                        $scope.countdown = "Closed";
                    }
                    else{
                        $scope.countdown = moment.duration(ms).humanize();
                    }

                }, 1000);
            }
        };

        function placeBid() {
            if (propertyService.isActive($scope.property)) {
                var bid = {};
                propertyService.placeBid($routeParams.property_id, $scope.auth.user.uid, $scope.bid);
                $scope.bid = {};
            } else {
                alert("Bidding is closed!");
            }
        }

        var openModal = function(template, controller) {
            var modalInstance = $modal.open({
                templateUrl: template,
                controller: controller
            });

            modalInstance.result.then(function() {
                placeBid();
            }, function(data) {
                if (data && data.openRegister) {
                    openModal("user/partials/registermodal.tpl.html", "RegisterCtrl");
                } else if (data && data.openLogin) {
                    openModal("user/partials/loginmodal.tpl.html", "LoginCtrl");
                }
                console.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.placeBid = function() {
            //check for login
            if ($scope.auth.user != null) {
                //check if full profile is complete
                //place the bid
                placeBid();
            } else {
                //popup login modal
                openModal("user/partials/loginmodal.tpl.html", "LoginCtrl");
            }
        };

        $scope.formatDate = function(date) {
            return moment(date).format("MMM DD, YYYY");
        };

        $timeout(function() {
            angular.element('.flexslider').flexslider({
                animation: "slide",
                controlNav: "thumbnails"
            });
        }, 1000);

        $scope.$on('$destroy', function() {
            // Make sure that the interval is destroyed too
            $scope.stopCountdown();
        });

    }
]);
