(function() {

  "use strict";

  angular
  .module('app.messages')
  .controller('MessageCtrl',MessageCtrl);

  MessageCtrl.$inject= ['common', '$scope', 'currentUser', 'UserResource', '$q', 'PubNub'];

  function MessageCtrl(common, $scope, currentUser, UserResource, $q, PubNub) {

    //Set the variables to current user, and retrieve information from DB about their education
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
      /* README FOR FRONT END
       *
       * For new messages to be appended to the array that would be displayed, the messages that comes in
       * must be in the channel as as the current channel
       *
       * vm.messages is the array of messages to display
       *
       * If we recieve a message belonging to a channel that we are subscribed to, but is not the current
       * channel, then vm.notifChannel is set as the channel from where that message came from
       *
       * If we recieve a message from the current channel, then we append the vm.messages array
       *
       * Call grabHistory() to switch to another channel and get the messages of that channel
       *
       */


      //current Channel used to display only current channel's messages
      var currentChannel;

      //get the email
      var email = JSON.stringify(vm.me.email);

      //create an array for messages,
      var messages = [];

      //var to hold information returned by pubnub's history
      var history;

      //set vm.messages to pass to html
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

      // An array of default subscriptions to subscribe too later
      var defaultSubscriptions = [universityChannel, careerCenterChannel, resLifeChannel, academicAdvisingChannel, finAidChannel];

      /* Function to remove apostrophes from beginning and end that results from JSON.stringify*/
      function getName(name){ return name.substring(1, name.length-1)};

      //set vm subscriptions
      vm.subsciptions = { universityChannel : true, careerCenterChannel : true, resLifeChannel : true, academicAdvisingChannel : true,  finAidChannel : true };

      /* A function to set the current channel*/
      vm.setCurrentChannel = function(ch){ currentChannel = ch};

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

      //Function used to display new messages
      vm.appendMessage = function(message){

        //push message into the messages array and set the instances' messages to that array
        messages.push(message);
        vm.messages = messages;

        console.log(vm.messages);
      };

      // A function to subscribe to a channel
      vm.subscribe = function(theChannel) {

        // Subscribe to the channel via PubNub
        PubNub.ngSubscribe({ channel: theChannel });
        console.log("subscribed to: " + theChannel);

        // Register for message events
        $scope.$on(PubNub.ngMsgEv(theChannel), function(ngEvent, payload) {
          $scope.$apply(function() {

            //Only display the new message if it is from current channel
            if(payload.channel == currentChannel) {
              vm.appendMessage(payload.message);
            } else {
              vm.notifChannel = payload.channel;
            }
          });
        });
      };

      console.log(messages);

      // Create a function to unsubscribe from a channel
      vm.unsubscribe = function(theChannel) {

        // Unsubscribe from the channel via PubNub
        PubNub.ngUnsubscribe({ channel: theChannel });
      };

      // Create a publish() function
      vm.publish = function(channel) {

        //Publishes to pubnub the message
        PubNub.ngPublish({
          channel: channel,
          message: vm.me.firstname + " " + vm.me.lastname[0] + " @" + channel + "]: " + vm.newMessage
        });

        //resets the newMessage
        vm.newMessage = '';
      };

      // updates the messages array to grab history for the channel
      // This is to be executed when user clicks on a channel (so we display the history
      // of the new channel the suer switched to)

      //IMPORTANT: apparently this calls the $scope register for message events if
      // we are retrieving history for a channel already subscribed to so if you want
      //in invoke this, you must subscribe to the channel before calling this
      vm.grabHistory = function(channelToGet, amountToGet){

        //set current channel and reset messages buffer
        currentChannel = channelToGet;
        messages = vm.messages =  [];

        // Use pubnub's history, to grab history
         PubNub.ngHistory({
           channel: channelToGet,
           count: amountToGet,
           reverse: false
         });
      };

      //Subscribe to all default channels
      for(var i = 0;i < defaultSubscriptions.length; i++){
        vm.subscribe(getName(defaultSubscriptions[i]));
      }

      //set current channel to first channel
      currentChannel = getName(defaultSubscriptions[0])

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

  }

}());
