(function() {

  "use strict";

  angular
  .module('app.messages')
  .controller('MessageCtrl',MessageCtrl);

  MessageCtrl.$inject= ['common', '$scope', 'currentUser', 'UserResource', '$q'];

  function MessageCtrl(common, $scope, currentUser, UserResource, $q) {
    var vm = this;
    vm.me = currentUser;

    /*
     *  prerender.io
     */
    $scope.$parent.seo = {
      pageTitle: 'Messages',
      pageDescription: 'Messages'
    };


    mixpanel.track("messages");
    mixpanel.people.increment('messages');

  }

}());
