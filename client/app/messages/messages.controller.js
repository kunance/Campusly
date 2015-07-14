(function() {

  "use strict";

  angular
  .module('app.messages')
  .controller('MessageCtrl',MessageCtrl);

  MessageCtrl.$inject= ['common', '$scope', 'currentUser', 'UserResource', '$q', 'PubNub'];

  function MessageCtrl(common, $scope, currentUser, UserResource, $q, PubNub) {
    var vm = this;
    vm.me = currentUser;
    vm.education = common.dataservice.getAllEducations(currentUser.id);

    /*
     * Collect all the promises in an array and load the initialize function only if the promises are met
     */
    var promises = [vm.education.$promise];
    $q.all(promises).then(function () {
      initializeMessageController()
    });

    function initializeMessageController () {

      var email = JSON.stringify(vm.me.email);
      var messages = [];"User " + Math.round(Math.random() * 1000);
      vm.messages = messages;

      /*
       * Identify list of default channels
       * Format: University + Channel Name
       */
      var universityChannel = JSON.stringify("#" + vm.education.relatedUniversityId.shortName);
      var careerCenterChannel = JSON.stringify("#" + vm.education.relatedUniversityId.shortName + " Career Center");
      var resLifeChannel = JSON.stringify("#" + vm.education.relatedUniversityId.shortName + " ResLife");
      var academicAdvisingChannel = JSON.stringify("#" + vm.education.relatedUniversityId.shortName + " Academic Advising");
      var finAidChannel = JSON.stringify("#" + vm.education.relatedUniversityId.shortName + " Financial Aid");

      //console.log (universityChannel);

      vm.subsciptions = { universityChannel : true, careerCenterChannel : true, resLifeChannel : true, academicAdvisingChannel : true,  finAidChannel : true };

      /*
       * PubNub init code
       * Keys used are from Sandbox - TODO - change before launching
       */
      PubNub.init({
        publish_key:'pub-c-cd12098a-7ff3-4558-921b-c4c7a70ed47a',
        subscribe_key:'sub-c-fb61f4f0-2402-11e5-8463-02ee2ddab7fe',
        uuid: email, //use existing user's ID as the UUID - unique user ID
        ssl: true
      });

      vm.publishMessage = function(message){
        messages.push(message);
        //console.log(messages);
        vm.messages = messages;
        console.log(vm.messages);
      };

      // Create a function to subscribe to a channel
      vm.subscribe = function(theChannel) {
        // Subscribe to the channel via PubNub
        PubNub.ngSubscribe({ channel: theChannel });
        console.log("subscribe");

        // Register for message events
        $scope.$on(PubNub.ngMsgEv(theChannel), function(ngEvent, payload) {
          $scope.$apply(function() {
            vm.publishMessage(payload.message);
          });
        });
      };


      console.log(messages);

      // Create a function to unsubscribe from a channel
      vm.unsubscribe = function(theChannel) {
        // Unsubscribe from the channel via PubNub
        PubNub.ngUnsubscribe({ channel: theChannel });
      };
      // Create a publish() function in the scope
      vm.publish = function(channel) {
        PubNub.ngPublish({
          channel: channel,
          message: vm.me.firstname + " " + vm.me.lastname[0] + " @" + channel + "]: " + vm.newMessage
        });
        vm.newMessage = '';
      };

      //$scope.

      // Create a subscribe/unsubscribe click handler
      vm.updateSubscription = function(theChannel) {
        if (vm.subscriptions[theChannel]) {
          vm.subscribe(theChannel);
          console.log(theChannel);
        } else {
          vm.unsubscribe(theChannel);
          console.log(theChannel + " unsubscribed!");
        }
      };

      /*
       *  prerender.io for SEO
       */
      $scope.$parent.seo = {
        pageTitle: 'Messages',
        pageDescription: 'Messages'
      };

      /*
       *  Mixpanel tracking code
       */
      mixpanel.track("messages");
      mixpanel.people.increment('messages');
    }

    ///// Code that may or may not be needed
    var retrieved = 0;

    // Set up the initial channel subscriptions
    //vm.updateSubscription('channel1');
    //$scope.updateSubscription('channel2');


  }

}());
