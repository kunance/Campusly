'use strict';

angular
  .module('RentedApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$scope', '$http', 'socket', 'common'];

function MainCtrl($rootScope, $scope, $http, socket, common) {
  var vm = this;
  var Auth = common.Auth;
  vm.address = {};

  vm.me = Auth.getCurrentUser();
  mixpanel.identify(vm.me.id);
  mixpanel.people.set({
    "$email": vm.me.email,
    "$first_name":vm.me.firstname,
    "$last_name":vm.me.lastname,
    "$created": vm.me.createdAt,
    "$phone": vm.me.phone,
    "$last_login": new Date()
  });
  $scope.$parent.seo = {
    pageTitle:'Welcome to Rented co',
    pageDescription:'Beast and easiest way to rent a place'
  };

  mixpanel.track("visited main view, with passed object",{title:$scope.$parent.seo.pageTitle});

  }
