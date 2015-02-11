'use strict';

angular
  .module('RentedApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$scope', '$http', 'socket'];

function MainCtrl($rootScope, $scope, $http, socket) {
  var vm = this;
  vm.address = {};
  $scope.$parent.seo = {
    pageTitle:'Welcome to Rented co',
    pageDescription:'Beast and easiest way to rent a place'
  };

  mixpanel.track("visited main view, with passed object",{title:$scope.$parent.seo.pageTitle});

  }
