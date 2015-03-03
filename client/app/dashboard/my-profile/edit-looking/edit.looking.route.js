(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .config(function($stateProvider) {
      $stateProvider
        .state('dashboard.myProfile.editLooking', {
          url: '/editLooking/:id',
          templateUrl: 'app/dashboard/my-profile/edit-looking/edit.looking.html',
          controller: 'EditLookingCtrl',
          controllerAs:'editLooking',
          authenticate: true,
          resolve:{
            getLooking:getLooking
          }
        });
    });

  function getLooking(common, $stateParams) {
    var lookingId = $stateParams.id;
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    return dataservice.getLooking(me, lookingId);
  }

}());
