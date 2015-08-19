/**
 * Created by vinitmodi on 8/16/15.
 */
(function () {
  'use strict';

  angular
    .module('app.widgets')
    .service('currentUserService', currentUserService);

  currentUserService.$inject = ['common', '$q', 'Auth'];

  function currentUserService (common, $q, Auth) {

    var info =  {
      userInfo: userInfoFunction
    };

    //console.log(info);
    return info;

    function userInfoFunction() {
      var vm = {};
      vm.me = Auth.getCurrentUser();
      vm.education = common.dataservice.getAllEducations(vm.me.id);

      var promises = [vm.me.$promise, vm.education.$promise];
      $q.all(promises).then(function () {
        //console.log(vm);
        return vm;
      });
    }

  }

}());
