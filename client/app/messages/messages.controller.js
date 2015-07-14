(function() {

  "use strict";

  angular
  .module('app.messages')
  .controller('MessageCtrl',MessageCtrl);

  MessageCtrl.$inject= ['common', '$scope', 'currentUser', 'UserResource', '$q', 'PubNub'];

  function MessageCtrl(common, $scope, currentUser, UserResource, $q, PubNub) {
    var vm = this;
    var retrieved = 0;
    var shortName;
    vm.me = currentUser;
    vm.education = common.dataservice.getAllEducations(currentUser.id);
    vm.education.$promise.then(function(data){
       console.log(data);
    });

    var email = JSON.stringify(vm.me.email);
    console.log(email);

    var messages = [];"User " + Math.round(Math.random() * 1000);

    // make up a user id (you probably already have this)
    vm.userId   =
    // set up initial channel memberships
    vm.subscriptions = { channel1 : true, channel2 : true };
    // pre-populate any existing messages (just an AngularJS scope object)
    vm.messages = messages;


    PubNub.init({
      subscribe_key: 'sub-c-fb61f4f0-2402-11e5-8463-02ee2ddab7fe',
      publish_key: 'pub-c-cd12098a-7ff3-4558-921b-c4c7a70ed47a',
      uuid: email
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

    // Set up the initial channel subscriptions
    //vm.updateSubscription('channel1');
    //$scope.updateSubscription('channel2');

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

}());
