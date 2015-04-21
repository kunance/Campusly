(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('SettingsCtrl', SettingsCtrl);

  SettingsCtrl.$inject = ['common', 'currentUser'];

  function SettingsCtrl(common, currentUser) {
    var vm = this;

    vm.me = currentUser;
    vm.tempMe = Object.create(vm.me);
    vm.ddlYesNoSelect = [{value: true, text: 'Yes'}, {value: false, text: 'No'}];
    vm.tempMe.experianIdToken = vm.tempMe.experianIdToken || 1;

    vm.changeSettings = function() {
        common.Auth.updateUser(vm.tempMe)
          .then(function (user) {
            common.Auth.setCurrentUser(user);
            common.logger.success('Settings successfully changed.');
          })
          .catch(function () {
            common.logger.error('Something went wrong. Changes are not saved.');
          });
    }

  }

}());
