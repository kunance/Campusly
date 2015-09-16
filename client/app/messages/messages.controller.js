(function() {

  "use strict";

  angular
    .module('app.messages')
    .controller('MessageCtrl', MessageCtrl);

  MessageCtrl.$inject = ['common', '$scope', 'currentUser', 'UserResource', '$q', 'pubNubService'];

  function MessageCtrl(common, $scope, currentUser, UserResource, $q, pubNubService) {

    //Set the variables to current user, and retrieve information from DB about their education
    var vm = this;
    var debug = false;
    vm.me = currentUser;

    vm.education = common.dataservice.getAllEducations(currentUser.id);

    /*
     * Collect all the promises in an array and load the initialize function only if the promises are met
     */
    var promises = [vm.education.$promise];

    $q.all(promises).then(function () {
      /*
       * Only initialize the PubNub message controller if the university is set.
       * If user has no university then they are prompted to update university before initializing
       */
      if (vm.education.universityId){
        pubNubService.setCurrentUser(vm.me);
        initializeMessageController();
      }

    });

    function initializeMessageController() {

      vm.pubNubService = pubNubService;
      if(pubNubService.privateMessages) pubNubService.privateMessages = [];
      if(pubNubService.oldestInboxTimeToken) pubNubService.oldestInboxTimeToken = null;
      if(pubNubService.privateSubscribe) pubNubService.privateSubscribe(vm.me.email);


      /* HTML and CSS: For the list of private messages, when someone clicks on one of the boxes,
       it should call vm.privateCurrentSubscribe
       */

      vm.oldestInboxTimeToken = null;
      vm.oldestChatTimeToken = null;

      //setTimeout(function(){pubNubService.initializeChat()}, 500);
      pubNubService.clearNotifs();

      setTimeout(function(){pubNubService.setNewMessages()}, 500);

      //sned time token
      setTimeout(function(){pubNubService.sendCurrentTimeToken()}, 1000);

      pubNubService.notAppCheckUnreadMessage(true);

      //tell the service we are in messages
      pubNubService.setInMessages(1);


      if(debug) {
        console.log('Below is pubNubService');
        console.log(pubNubService);
      }

    }

    mixpanel.track("messages view");
    mixpanel.people.increment('messages view');

    vm.trackMixpanelMessageSent = function () {
      mixpanel.track("Message sent");
      mixpanel.track("Message sent from main message view");
    };

    /*
     *  prerender.io
     */
    $scope.$parent.seo = {
      pageTitle: 'Campusly Messages',
      pageDescription: 'Your personal dashboard'
    };

  }

}());
