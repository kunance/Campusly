//(function () {
//  "use strict";
//
//  angular
//    .module('app.account')
//    .config(config);
//
//  function config($stateProvider) {
//    $stateProvider
//      .state('settings.address.edit', {
//        url: '/edit/:id',
//        templateUrl: 'app/account/settings/address/edit/edit.address.html',
//        controller: 'EditAddressCtrl',
//        controllerAs:'editAddress',
//        resolve:{
//          getAddress: getAddress
//        },
//        authenticate: true
//      });
//  }
//
//  function getAddress(common, $stateParams) {
//    var addressId = $stateParams.id;
//    var dataservice = common.dataservice;
//    var me = common.Auth.getCurrentUser();
//    return dataservice.getAddress(me, addressId);
//  }
//
//}());
