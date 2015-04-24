(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('SettingsCtrl', SettingsCtrl);

  SettingsCtrl.$inject = ['common', 'currentUser', '$stateParams'];

  function SettingsCtrl(common, currentUser, $stateParams) {
    var vm = this;

    vm.focus = $stateParams.focus;
    vm.me = currentUser;
    vm.tempMe = Object.create(vm.me);
    vm.ddlYesNoSelect = [{value: true, text: 'Yes'}, {value: false, text: 'No'}];
    vm.tempMe.experianIdToken = vm.tempMe.experianIdToken || 1;

    if(vm.focus == 'radius')
    $('#userSearchRadius').focus();
    if(vm.focus == 'allowConnect')
    $('#allowAroundMe').focus();

    vm.changeSettings = function() {
        common.Auth.updateUser(vm.tempMe)
          .then(function (user) {
            common.Auth.setCurrentUser(user);
            common.logger.success('Settings successfully changed.');
          })
          .catch(function () {
            common.logger.error('Something went wrong. Changes are not saved.');
          });
    };

    mixpanel.track("settings view");
    mixpanel.people.increment('settings view');

  }

}());
