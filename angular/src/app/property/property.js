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
    }])

    .controller('PropertyDetailsCtrl', ['$scope', '$routeParams', 'propertyService', '$filter', function ($scope, $routeParams, propertyService, $filter) {

        propertyService.fetch($routeParams.property_id).$bind($scope, 'property');
        propertyService.fetchBids($routeParams.property_id).$bind($scope, 'bids');

        $scope.bid = {};

        $scope.placeBid = function () {
            var bid = {};
            angular.extend(bid, $scope.bid, {user: $scope.auth.user.uid, date: new Date()});
            propertyService.placeBid($routeParams.property_id, bid);
            $scope.bid = {};
        };

        $scope.formatDate = function(date){
            return moment(date).format("MMM DD, YYYY");
        };

    }]);