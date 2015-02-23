(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('dashboard.myProfile.editAddress', {
        url: '/editAddress/:id',
        templateUrl: 'app/dashboard/my-profile/edit-address/edit.address.html',
        controller: 'EditAddressCtrl',
        controllerAs:'editAddress',
        resolve:{
          getAddress: getAddress
        },
        authenticate: true
      });
  }

  function getAddress(common, $stateParams) {
    var addressId = $stateParams.id;
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    return dataservice.getAddress(me, addressId);
  }

}());
