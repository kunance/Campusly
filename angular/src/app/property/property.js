'use strict';

/* Controllers */

angular.module('myApp.property', ['ngRoute'])

    // configure views; the authRequired parameter is used for specifying pages
    // which should only be available while logged in
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/property/:property_id', {
            templateUrl: 'property/partials/details.tpl.html',
            controller: 'PropertyDetailsCtrl'
        });

        $routeProvider.when('/properties', {
            templateUrl: 'property/partials/list.tpl.html',
            controller: 'PropertyListCtrl'
        });

    }])

    .controller('PropertyListCtrl', ['$scope', 'propertyService', function ($scope, propertyService, $filter) {
        propertyService.list().$bind($scope, 'properties');
        $scope.isActive = function(property){
            return moment().isBefore(property.endDate);
        }
    }])

    .controller('PropertyDetailsCtrl', ['$scope', '$rootScope', '$routeParams', 'propertyService', '$filter', '$timeout', 'loginService', '$modal', function ($scope, $rootScope, $routeParams, propertyService, $filter, $timeout, loginService, $modal) {

        $scope.property_id = $routeParams.property_id;
        $scope.user = {};

        var isActive = function(property){
            return moment().isBefore(property.endDate);
        };

        propertyService.fetch($routeParams.property_id).$bind($scope, 'property');
        propertyService.fetchBids($routeParams.property_id).$bind($scope, 'bids');

        function placeBid() {
            if(isActive($scope.property)){
                var bid = {};
                angular.extend(bid, $scope.bid, {user: $scope.auth.user.uid, date: new Date()});
                propertyService.placeBid($routeParams.property_id, bid);
                $scope.user.creditScore = $scope.bid.creditScore;
                $scope.bid = {};
            }
            else{
                alert("Bidding is closed!");
            }
        }

        $scope.bid = {};

        if($rootScope.user){
            $scope.user = $rootScope.user;
            $scope.bid.creditScore = $rootScope.user.creditScore
        }

        $scope.$watch('user', function(newValue, oldValue) {
            console.log(newValue);
            if(newValue){
                $scope.user = newValue;
                $scope.bid.creditScore = newValue.creditScore;
            }
        });

        $scope.placeBid = function () {
            //check for login
            if ($scope.auth.user != null) {
                //place the bid
                placeBid();
            }
            else {
                //popup login modal
                var modalInstance = $modal.open({
                    templateUrl: "user/partials/loginmodal.tpl.html",
                    controller: "LoginCtrl"
                });

                modalInstance.result.then(function (selectedItem) {
                    placeBid();
                }, function () {
                    console.info('Modal dismissed at: ' + new Date());
                });
            }

        };

        $scope.formatDate = function (date) {
            return moment(date).format("MMM DD, YYYY");
        };

        $timeout(function () {
            angular.element('.flexslider').flexslider({
                animation: "slide",
                controlNav: "thumbnails"
            });
        }, 1000);

    }]);