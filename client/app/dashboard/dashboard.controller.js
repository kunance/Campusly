(function() {

  "use strict";

  angular
    .module('app.dashboard')
    .controller('DashboardCtrl',DashboardCtrl);

  DashboardCtrl.$inject=['common', '$scope'];

  function DashboardCtrl(common, $scope) {
    var vm = this;
    var Auth = common.Auth;
    vm.address = {};
    vm.me = Auth.getCurrentUser();

    vm.tabs = [
      { title:"Dashboard", sref:"dashboard", active: true },
      { title:"My profile", sref:".myProfile"},
      { title:"My properties", sref:".myProperties"},
      { title:"My connections", sref:".myConnections"},
      { title:"My favorites", sref:".myFavorites"},
      { title:"Messages", sref:".messages"}];

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
    mixpanel.track("visited dashboard view, with passed object",{title:$scope.$parent.seo.pageTitle});
  }

}());
