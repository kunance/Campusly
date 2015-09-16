/**
 * Created by vinitmodi on 8/7/15.
 */
(function () {

  'use strict';

  angular
    .module('app.widgets')
    .service('pubNubService', pubNubService);

  pubNubService.$inject = ['common', '$q', 'PubNub', 'Auth'];

  function pubNubService(common, $q, PubNub, Auth) {

    var timeConvert = 10000;

    var vm = {};
    var pubNubInitialized = 0;

    var debug = false;
    var production = 0;

    // For starting new conversations
    var hashedMessageText = "asldnA@ASDa0klnkjkj!#CFV$Fcvasdas7879";

    var promises = [];

    if(debug) console.log('initialized pubnubServe (not pubnub itself');

    var user = {};
    user.education = {};

    vm.setCurrentUser = function (userInput) {
      user = userInput;
    };

    if(debug)console.log('PubNub service initialization with usermail = ' + user.email);


    vm.initPubNub = function() {
      if (user.email) {

        user.education = common.dataservice.getAllEducations(user.id);
        promises = [user.education.$promise];

        if (debug)
          console.log('init if');

        if (production == 1) {
          if(debug) console.log('production is 1');
          //production keys
          PubNub.init({
            publish_key: 'pub-c-1d8b120f-467f-4253-b297-e0033e391ea3',
            subscribe_key: 'sub-c-2340267c-2403-11e5-9fdc-02ee2ddab7fe',
            uuid: user.email, //use existing user's ID as the UUID - unique user ID
            ssl: true,
            callback: function () {
              if (debug) {
                console.log('pubnut init');
                console.log(PubNub);
              }
              pubNubInitialized = 1;

            }
          });
        }
        else if (production == 0) {
          //development
          PubNub.init({
            publish_key: 'pub-c-cd12098a-7ff3-4558-921b-c4c7a70ed47a',
            subscribe_key: 'sub-c-fb61f4f0-2402-11e5-8463-02ee2ddab7fe',
            uuid: user.email, //use existing user's ID as the UUID - unique user ID
            ssl: true,
            callback: function () {
              if (debug) {
                console.log('pubnut init');
                console.log(PubNub);
              }

              pubNubInitialized = 1;

            }
          });
          if (debug) console.log(PubNub);

        }
      }
    };

    //calling pubnub init function
    vm.initPubNub();

    var scope = {};
    vm.inMessages = 0;
    vm.notifs = {};
    var retVal = {};

    $q.all(promises).then(function (retVal) {
      /*
       * Only initialize the PubNub message controller if the university is set.
       * If user has no university then they are prompted to update university before initializing
       */
      if (user.education.universityId) {
        retVal.ret = vm.initializeChat();
        return retVal;

      }
    });

    vm.initializeChat = function() {
      if(debug)console.log('execute vm.initializeChat()');

      /* HTML and CSS: For the list of private messages, when someone clicks on one of the boxes,
       it should call vm.privateCurrentSubscribe
       */


      var email = JSON.stringify(user.email);
      vm.newMessage = '';
      vm.currentChannel = {'name': '', 'secondaryChannel': null, 'email': null};

      vm.oldestInboxTimeToken = null;
      vm.oldestChatTimeToken = null;

      vm.currentMessages = [];

      /* Private messages element:
       { user:
       email:
       text:
       time:
       delivered:
       }
       */

      vm.privateMessages = [];
      /* Private messages element:
       { user:
       email:
       text:
       new: //indicates that there is a new unread message
       selected:  }
       */

      vm.groupChannels = [];
      /* Group Channel elements
       { name:
       new:
       selected:  }
       */

      /* Convention of a pubnub message:

       { "user": "",
       "email": "",
       "text": ""
       }
       */

      vm.groupChannelInitialization = function () {
        /*
         * Identify list of default channels
         * Format: University + Channel Name
         */
        var universityChannel = JSON.stringify(user.education.relatedUniversityId.shortName + " General");
        var universityOffCampusHousingChannel = JSON.stringify(user.education.relatedUniversityId.shortName + " Off-campus Housing");

        /*
         * Remove quotation from the JSON stringify
         */
        var universityChannelText = vm.replaceQuotesFunction (universityChannel);
        var universityOffCampusHousingChannelText = vm.replaceQuotesFunction (universityOffCampusHousingChannel);


        vm.subscribeToHousingGroups([universityChannelText, universityOffCampusHousingChannelText]);

        //Hiding for first launch
        //vm.housingGroups = ["Tercero", "Building A", "Floor 99"];
        //vm.subscribeToHousingGroups([universityChannelText, universityOffCampusHousingChannelText, careerCenterChannelText, resLifeChannelText, academicAdvisingChannelText,
        //  finAidChannelText]);

        //vm.subscribeToRAChannel();
        //vm.subscribeToHousingGroups(vm.housingGroups);
      };


      /*
       * Removes quotation from the JSON stringify
       */
      vm.replaceQuotesFunction = function (channel) {
        return channel.replace(/\"/g, "");
      };


      /* Function: Create a new privateMessage element to add to sidebar, this is meant to be
       *            called and it will append a new private message element to the
       *           privateMessages array
       *
       *   1. Searches the current private messages array to see if there is one already
       *   2. If one is found, currentsSubscribe to that channel
       *   3. Else create a new element to append to the private messages array
       */
      vm.newPrivateConversation = function (userToMessage, email) {
        for (var i = 0; i < vm.privateMessages.length; i++) {
          if (vm.privateMessages[i].email == email) {
            vm.privateCurrentSubscribe(email, userToMessage);
            return;
          }
        }

        if(debug) console.log('user to message: ' + userToMessage);
        if (debug) console.log('newPrivate Convo');

        var newConvo = { "user": userToMessage,
          "email": email,
          "text": "" };

        if(debug) console.log(newConvo);

        vm.privateMessages.unshift(newConvo);

        PubNub.ngPublish({
          channel: user.email,
          message: newConvo,
          callback: function(m){
            setTimeout(function(){

              scope.$apply();

              for (var i = 0; i < vm.privateMessages.length; i++) {
                if (vm.privateMessages[i].email == email) {
                  vm.privateCurrentSubscribe(email, userToMessage);
                  return;
                }
              }
            }, 100);
          }
        });

        if(debug) console.log(user.email);

        //set timeout is required
        //setTimeout(function(){vm.privateCurrentSubscribe(vm.privateMessages[0].email, vm.privateMessages[0].user)}, 100);

      };


      /* Intended to be used to subscribe to user's personal private message channel, executed on
       app load.

       1. Subscribes to the user's personal inbox
       2. When we get a new message, we call the function to re-evaluate the private messages array
       3. Send Current Time token
       */
      vm.privateSubscribe = function (theChannel) {
        if (debug) console.log("vm.privateSubscribe: subscribed to: " + theChannel);

        // Subscribe to the channel via PubNub
        PubNub.ngSubscribe({
          channel: theChannel,
          message: function (message) {

            if(debug)console.log('new inbox message!');
            vm.evaluateNewPrivateMessage(message[0]);
            if(vm.inMessages == 1)
              vm.sendCurrentTimeToken();
          }
        });

        vm.grabInboxHistory();

      };


      /* currentSubscribe to a private messaging channel

       1. Computes the hash code for the current user's email and private message target's email
       2. Calls on currentSubscribe passing in the email and private message target's email
       */
      vm.privateCurrentSubscribe = function (email, firstName) {
        vm.currentChannel.email = email;
        if(debug) console.log(vm.currentChannel.email);
        var hashedChannelName = vm.privateChannelHashCode(user.email, email);
        vm.currentSubscribe(firstName, hashedChannelName);
      };


      /* A function to to parse new messages from the inbox channel
       and reorganize the private messages array

       1. Check if there is another element with the same email
       2. If yes, splice that off the array
       3. Append the new message to the beginning of the array with new = 1
       4. If the current channel is the same email as the new message, set selected and new to 1,
       else set selected to 0 and new to 1;
       */
      vm.evaluateNewPrivateMessage = function (message) {

        for (var i = 0; i < vm.privateMessages.length; i++) {
          if (vm.privateMessages[i].email == message.email) {
            vm.privateMessages.splice(i, 1);
            break
          }
        }

        if (vm.currentChannel.name == message.email) {
          message.selected = 1;
          message.new = 0;
        } else {
          message.selected = 0;
          message.new = 1;
        }

        vm.privateMessages.unshift(message);
        scope.$apply();

      };


      /* A function to parse old messages (history) from the inbox channel and add
       to the end of the private message array

       1. Check if there is another element with the same email
       2. If yes, do nothing
       3. Else add to the END of the array with new = 0 and selected = 0;
       4. Check if message's timeToken is greater than userTimeToken, if so then set messages to new
       */
      vm.evaluateOldPrivateMessage = function (message, messageTimeToken, userTimeToken) {


        for (var i = 0; i < vm.privateMessages.length; i++) {

          if (vm.privateMessages[i].email == message.email) {
            return;
          }
        }

        if(message.new == 0 && messageTimeToken - userTimeToken > 0)
          message.new = 1;
        else
          message.new = 0;

        message.selected = 0;

        vm.privateMessages.push(message);
        scope.$apply();
      };


      /* Function: For the private message inbox, grab older chat history and evaluate

       1. Using the oldest inbox timetoken, we make a call to pubnub history.
       1.1 Then we get the most recent time token from user's timetoken channel
       2. With the returned messages array, we call evaluateOldPrivateMessage on each message
       3. Set the new oldest inbox time token to the time token of the oldest message
       */
      vm.grabInboxHistory = function () {
        if(debug)console.log('execute vm.grabInboxHistory');

        var retrievedHistory = [];

        PubNub.jsapi.history({
          channel: user.email,
          reverse: false,
          start: vm.oldestInboxTimeToken,
          include_token: true,
          callback: function (m) {
            retrievedHistory = m[0];

            if (debug) console.log('retrived history');

            PubNub.jsapi.history({
              channel: user.email + '_timeTokens',
              count: 1,
              reverse: false,
              include_token: true,
              callback: function (m) {

                var mostRecentCheck = Number(m[1]);
                if(debug) console.log('latest read time token = ' + mostRecentCheck);
                if(debug) console.log('vm.grabInboxHistory: array length of retrived history = ' + retrievedHistory.length);

                for (var i = retrievedHistory.length - 1; i > -1; i--) {
                  if(i == retrievedHistory.length-1){
                    if(debug)console.log(retrievedHistory[i].message);
                    if(debug)console.log(retrievedHistory[i].timetoken);
                  }
                  vm.evaluateOldPrivateMessage(retrievedHistory[i].message, retrievedHistory[i].timetoken, mostRecentCheck);
                }

                vm.oldestInboxTimeToken = m[1];
                scope.$apply();

              }
            });

          }
        });
        // returns: [[message1, message2, ...], oldestTimeToken, newestTimeToken
      };


      /* A function to set the current channels's selected attribute to 1 in order for
       HTML and css to highlight that channel

       1. Iterate through the privateMessages array and check if current channelName matches email
       2. If there is a match, set selected to 1. Otherwise set selected to 0
       3. Repeat and do the same for group channels xcept compare
       */
      vm.updateSelectedChannel = function () {

        for (var i = 0; i < vm.privateMessages.length; i++) {
          if (vm.currentChannel.name == vm.privateMessages[i].user) {
            vm.privateMessages[i].selected = 1;
            vm.privateMessages[i].new = 0;
          } else
            vm.privateMessages[i].selected = 0;

        }

        for (var i = 0; i < vm.groupChannels.length; i++) {
          if (vm.currentChannel.name == vm.groupChannels[i].name) {
            if (debug) console.log(vm.groupChannels[i]);
            vm.groupChannels[i].selected = 1;
            vm.groupChannels[i].new = 0;
          } else
            vm.groupChannels[i].selected = 0;
        }

        setTimeout(function () {
          scope.$apply();
        }, 100);

      };


      /* Function: Subscribe to only the name of the channel passed in (group channel)

       1. calls currentSubscribe passing in only the name as first param and second param as null
       */
      vm.groupChannelCurrentSubscribe = function (channelName) {
        vm.currentSubscribe(channelName, null);
      };


      /* Function: Subscribe and get notifcations from group channels

       1. PubNub subscribes to the group channel name
       2. When message callback is invokes, then we check the array for a same name as the message's channel
       3. If one is found, then set the group channel to indicate new message
       */
      vm.groupChannelSubscribe = function (channelName) {
        vm.currentChannel.email = null;

        PubNub.ngSubscribe({
          channel: channelName,
          message: function (m) {

            var groupName = m[2];
            if (debug) console.log(m[2]);

            for (var i = 0; i < vm.groupChannels.length; i++) {
              if (vm.groupChannels[i].name == groupName)
                vm.groupChannels[i].new = 1;
            }

            scope.$apply();
          }
        });
      };


      /* A function to unsubscribe from the current channel and subscribe to
       the selected channel and show in the chat window.

       1. Unsubscribe from the currentChannel.name and clear the secondaryName and currentMessages array
       2. Subscribes to the chanel name indicated by first or second param (second param has higher precedence)
       2.5. Set the respected currentChannel properties to the params
       3. Makes sure new messages are appended to the end of currentMessages array
       4. Set the currentChannel's secondaryChannel to the 2nd param (used for private messaging)
       5. If secondaryChannel exists, grab history from that channel (private messaging)
       6. Else, grab history from channel name (group chats)
       7. Set the oldest inbox time token to the time token of earliest message
       */
      vm.currentSubscribe = function (channelName, channelSecondaryName) {
        vm.currentMessages = [];

        PubNub.ngUnsubscribe({
          channel: vm.currentChannel.secondaryChannel,
          callback: function (m) {
            if (debug) console.log(m);
          }
        });


        PubNub.ngUnsubscribe({
          channel: vm.currentChannel.name,
          callback: function (m) {
            if (debug) console.log(m);
          }
        });


        if (channelSecondaryName) {
          PubNub.ngSubscribe({
            channel: channelSecondaryName,
            message: function (m) {
              if (debug) console.log(m);
              vm.evaluateNewMessage(null, m, true);
              if (debug) console.log(vm.currentMessages);
              scope.$apply();
            }
          });

          vm.currentChannel.name = channelName;
          vm.currentChannel.secondaryChannel = channelSecondaryName;
          vm.grabCurrentChatHistory();

        } else if (channelName) {

          PubNub.ngSubscribe({
            channel: channelName,
            message: function (m) {
              if (debug) console.log(m);
              vm.evaluateNewMessage(null, m, true);
              //vm.currentMessages.push(m[0]);
              scope.$apply();
              if (debug) console.log(vm.currentMessages);
            }

          });


          vm.currentChannel.name = channelName;
          vm.currentChannel.secondaryChannel = null;
          vm.grabCurrentChatHistory();
        }

        vm.updateSelectedChannel();
      };


      /* Function: For the current open chat, changes messages's user to null if the previous message is also
       sent by the same user.

       1. If the message is a new message, check the last element's user. If the messageToEval's user is the same as
       the last message's user, then change the messageToEval's user to null and push to the currentMessages array
       2. If yes, newMessage is not true, that means we are getting history/old messages.
       3. We iterate through the old messages list in reverse and check if the previous user is the same as the element before hand.
       4. If yes, set user to null. Then unshift to the currentMessages array
       */
      vm.evaluateNewMessage = function (messageArray, messageToEval, newMessage) {

        if (newMessage) {
          if (vm.currentMessages.length > 0) {
            if (vm.currentMessages[vm.currentMessages.length - 1].email == messageToEval[0].email) {
              messageToEval[0].user = null;
            }
          }
          if (debug) console.log(vm.getTime(Number(messageToEval[1][1])));
          messageToEval[0].time = vm.getTime(Number(messageToEval[1][1]));
          messageToEval[0].delivered = 1;
          vm.currentMessages.push(messageToEval[0]);

        } else if (newMessage == false) {

          for (var i = messageArray.length - 1; i >= 0; i--) {
            if (i != 0) {
              if (messageArray[i].message.email == messageArray[i - 1].message.email) {
                messageArray[i].message.user = null;
              }
            }

            messageArray[i].message.time = vm.getTime(Number(messageArray[i].timetoken));

            vm.currentMessages.unshift(messageArray[i].message);
          }

          if (debug) console.log(vm.currentMessages);

        }

      };


      /* Function: Checks to see if a message has been delivered

          1. Checks if we are in private Channel, if we are, then continue
          2. Check: only if the message is sent by us, then we continue
          3. Grab the timetoken from the most recent message from the timeToken channel of the other user
          4. Compare the time token from the message vs the timeToken channel
          5. If message is more recent, delivered is 0, If the timeToken channel is more recent, then delivered = 1
       */
      vm.checkMessageDeliveredStatus = function(message){

        //if subscribed to a private channel
        if(vm.currentChannel.secondaryChannel != null){

        }
      };


      /* Function: For the current open chat, grab chat history and append to array

       1. We make a call to Pubnub's history api
       2. With the returned messages array, we append each of the elements to the beginning of currentMessages array
       3. Set the new oldest time token to the time token of the oldest message
       */
      vm.grabCurrentChatHistory = function () {

        if (vm.currentChannel.secondaryChannel)
          var channelName = vm.currentChannel.secondaryChannel;
        else
          var channelName = vm.currentChannel.name;

        var retrievedHistory = [];

        PubNub.jsapi.history({
          channel: channelName,
          count: 100,
          reverse: false,
          include_token: true,
          callback: function (m) {
            vm.currentMessages = [];

            retrievedHistory = m[0];

            vm.evaluateNewMessage(retrievedHistory, null, false);

            vm.oldestChatTimeToken = m[1];
            scope.$apply();
          }
        });
        // returns: [[message1, message2, ...], oldestTimeToken, newestTimeToken
      };


      /* Function: For the current open chat, grab older history and append to the beginning of currentMessages
       array
       1. Using the oldest inbox timetoken, we make a call to pubnub history.
       2. With the returned messages array, we append each of the elements to the beginning of currentMessages array
       3. Set the new oldest time token to the time token of the oldest message
       */
      vm.grabOlderCurrentChatHistory = function () {

        if (vm.currentChannel.secondaryChannel)
          var channelName = vm.currentChannel.secondaryChannel;
        else
          var channelName = vm.currentChannel.name;

        var retrievedHistory = [];

        PubNub.jsapi.history({
          channel: channelName,
          reverse: false,
          count: 20,
          start: vm.oldestChatTimeToken,
          include_token: true,
          callback: function (m) {
            retrievedHistory = m[0];


            vm.evaluateNewMessage(retrievedHistory, null, false);

            vm.oldestChatTimeToken = m[1];
            scope.$apply();
          }
        });
        // returns: [[message1, message2, ...], oldestTimeToken, newestTimeToken
      };


      /* A function to publish to the currently selected channel,

       1. Checks to see if the currentChannel's secondaryChannel exists
       2. If it does, means its a private channel and publishes to both channels
       3. Else publishes to only the channel name
       4. Resets the newMessage
       */
      vm.currentPublish = function () {
        if (vm.currentChannel.secondaryChannel)
          vm.publish(vm.currentChannel.secondaryChannel);

        else if (vm.currentChannel.name)
          vm.publish(vm.currentChannel.name);

        if(debug) console.log('email inbox sent to is: ' + vm.currentChannel.email);


        if(vm.currentChannel.email) {
          vm.publish(vm.currentChannel.email);
        }

        vm.newMessage = '';
      };



      /* A function to publish to the specified channel
       NOTE: Does not specifically publish to current channel
       */
      vm.publish = function(channel){
        //Publishes to pubnub the message
        PubNub.ngPublish({
          channel: channel,
          message: {
            "user": user.firstname,
            "email": user.email,
            "text": vm.newMessage
          }
        });

      };


      /* Function: Check if user is an RA, if so, subscribe to the RA channel
       *   1. Checks the user.role attritbute to see if an RA
       *   2. If yes, then add to RA channel
       */
      vm.subscribeToRAChannel = function(){
        /* Group Channel elements
         { name:
         new:
         selected:  }
         */

        if(user.role == "RA"){
          var RAChannel = {"name": "#RAs",
            "new": 0,
            "selected": 0};

          vm.groupChannels.push(RAChannel);
          vm.groupChannelSubscribe(RAChannel.name);
        }
      };


      /* Function: subscribes to the housing groups that the student is in

       1. Takes in an arrray of all the housing groups the student is in
       2. Iterates through that array and subscribes to those groups
       */
      vm.subscribeToHousingGroups = function(groups){

        for(var i = 0; i < groups.length; i++){
          var newGroup = {"name": groups[i],
            "new": 0,
            "selected": 0};

          vm.groupChannels.push(newGroup);
          vm.groupChannelSubscribe(groups[i]);
        }
      };

      /* for punub history, we add the new messages starting from the end of the history messages array,
       and add to the beginning of the currentMessages array. To stay in chronological order.
       */

      //initialize all the group channels
      vm.groupChannelInitialization();

      //subscribe user to default university channel upon clicking messages in the navbar
      vm.groupChannelCurrentSubscribe(vm.groupChannels[0].name);

      //subscribe to one's inbox
      if(debug) console.log('vm.initializeChat(): user email is ' + user.email);
      setTimeout(function(){vm.privateSubscribe(user.email);}, 100);
      if(debug) console.log(vm.privateMessages);


    }; //END OF INITIALIZATION
      /*-------------------------------------------------------------------------------*/

    vm.setNotifsAndScope = function (notifs, scoper){
      vm.notifs = notifs;
      scope = scoper;
    };

    vm.clearNotifs = function(){
      setTimeout(function(){vm.notifs.pmNotif = 0;scope.$apply();}, 75);
    };


    /* Function: Initializes pubnub if there is a user

      1. Checks if the user email is null
      2. If so, then retrieve new user.
      3. Then initialize PubNub
     */
    vm.notAppUpdateUser = function(){
       if(debug)console.log('notAppUpdateUser: user.email = ' + user.email);


      if(user.email == null || pubNubInitialized == 0){
        user = Auth.getCurrentUser();
        user.education = common.dataservice.getAllEducations(user.id);

        if(production == 1){
          //production keys
          PubNub.init({
            publish_key: 'pub-c-1d8b120f-467f-4253-b297-e0033e391ea3',
            subscribe_key: 'sub-c-2340267c-2403-11e5-9fdc-02ee2ddab7fe',
            uuid: user.email, //use existing user's ID as the UUID - unique user ID
            ssl: true,
            callback: function(){
              if(debug)
                console.log('pubnut init');

            }
          });

          pubNubInitialized = 1;

        }
        else if (production == 0) {
          //development keys
          PubNub.init({
            publish_key: 'pub-c-cd12098a-7ff3-4558-921b-c4c7a70ed47a',
            subscribe_key: 'sub-c-fb61f4f0-2402-11e5-8463-02ee2ddab7fe',
            uuid: user.email, //use existing user's ID as the UUID - unique user ID
            ssl: true,
            callback: function(){
              if(debug)
                console.log('pubnut init');
            }
          });

          pubNubInitialized = 1;

        }

        promises = [user.education.$promise];
        $q.all(promises).then(function (retVal) {
          /*
           * Only initialize the PubNub message controller if the university is set.
           * If user has no university then they are prompted to update university before initializing
           */
          if (user.education.universityId) {
            retVal.ret = vm.initializeChat();
          }
        });

      }
    };

    vm.getPubNubObject = function() {
      if(debug) {
        var pb = PubNub;
        console.log("function called");
        console.log(PubNub);
        console.log(PubNub._instance);
        setTimeout(function(){console.log(PubNub._instance)}, 5000);
      }
      return PubNub;
    };

    /* Function: notApp - subscribes to one's personal channel
    *    1. Subscribes to th user's inbox
    *    2. If not in messages, then execute
    *    2. Messages execute the new pm method and along with scope apply
    *
     */
    vm.notAppPrivateSubscribe = function () {

      if (PubNub) {

        if(debug) console.log('private message notifs');

      // Subscribe to the channel via PubNub
      PubNub.ngSubscribe({
        channel: user.email,
        message: function (message) {

          if(vm.inMessages == 0) {
            vm.notifs.newPM();
            if(debug) console.log('new message');
            scope.$apply();
          } else {
            vm.sendCurrentTimeToken();
          }

        }
      });
      }
    };


    /* Function: sends a message to the user's time token channel

        1: appends '_timeToken' to the users email (e.g. aayang@ucsd.edu_timeTokens)
        2. Publishes to that channel
     */
    vm.sendCurrentTimeToken = function(){
      if(debug)console.log('execute: sendCurrentTimeToken');

      var channel = user.email +  '_timeTokens';

      PubNub.ngPublish({
        channel: channel,
        message: 'token'
      })
    };


    /* checks for unread private messages*/
    vm.notAppCheckUnreadMessage = function(inCtrl){

      var mostRecentMessageTime;
      var mostRecentCheck;

      if(!inCtrl) {

        PubNub.jsapi.history({
          channel: user.email,
          count: 1,
          reverse: false,
          include_token: true,
          callback: function (m) {

            if (m[0].length == 0) return;
            var tempMessageText = m[0][0].message.text;
            if (tempMessageText == hashedMessageText){
              return;
            }

            mostRecentMessageTime = Number(m[1]);

            if(debug) console.log('email time token = ' + mostRecentMessageTime);

          }
        });

        PubNub.jsapi.history({
          channel: user.email + '_timeTokens',
          count: 1,
          reverse: false,
          include_token: true,
          callback: function (m) {

            mostRecentCheck = Number(m[1]);
            if(debug) console.log('latest read time token = ' + mostRecentCheck);

          }
        });

        setTimeout(function () {
          if(mostRecentCheck == null || mostRecentMessageTime == null)
            return;

          if(vm.inMessages == 0) {
            if ((mostRecentMessageTime) > (mostRecentCheck)) {
              vm.notifs.newPM();
              scope.$apply();
            }
          }
        }, 1100);

      } else if(inCtrl){

        PubNub.jsapi.history({
          channel: user.email + '_timeTokens',
          count: 1,
          reverse: false,
          include_token: true,
          callback: function (m) {

            mostRecentCheck = Number(m[1]);
            if(m[1] == null) return;
            mostRecentCheck = Math.floor(mostRecentCheck/10000);

            if(debug) console.log('latest read time token = ' + mostRecentCheck);
            if(debug) console.log('current time is          '+ currentTime);


                if ((mostRecentMessageTime) > (currentTime)) {
                  vm.notifs.newPM();
                  scope.$apply();
                } else {
                  vm.notifs.clearPM();
                  scope.$apply();
                }

          }
        });


        var d = new Date();
        var currentTime = d.getTime();
        if(debug) console.log('current time');
        if(debug) console.log(d.getTime());
      }

    };


    /* Function: checks for new messages and change the new attribute to reflect it in the
       priate messages array
      */
    vm.setNewMessages = function(){
      if(debug)console.log('execute vm.setUnreadMessages');

      var retrievedHistory = [];

      PubNub.jsapi.history({
        channel: user.email,
        reverse: false,
        include_token: true,
        callback: function (m) {
          retrievedHistory = m[0];

          PubNub.jsapi.history({
            channel: user.email + '_timeTokens',
            count: 1,
            reverse: false,
            include_token: true,
            callback: function (history) {

              var mostRecentCheck = Number(history[1]);
              if(debug) console.log('latest read time token = ' + mostRecentCheck);
              if(debug) console.log('vm.grabInboxHistory: array length of retrived history = ' + retrievedHistory.length);

              for (var i = retrievedHistory.length -1; i > -1; i--) {
                if(debug)console.log('new message!  ' + i);

                if(i == retrievedHistory.length-1){
                  if(debug)console.log(retrievedHistory[i].message);
                  if(debug)console.log(retrievedHistory[i].timetoken);
                }

                for (var a = 0; a < vm.privateMessages.length; a++) {

                  if (vm.privateMessages[a].email == retrievedHistory[i].message.email) {
                    //if(debug)console.log('same email');
                    //if(debug)console.log('mostrecentcheck - timetoken = ' + (mostRecentCheck - retrievedHistory[i].timetoken));
                    if(mostRecentCheck - retrievedHistory[i].timetoken < 0){

                      if(debug)console.log('unread');
                      vm.privateMessages[a].new = 1;
                      if(debug)console.log(vm.privateMessages[a].email);
                    }

                  }

                }

              }

              scope.$apply();

            }
          });

        }
      });
    };


    /*  Function: Private messages someone

     1. Computes the hash code for the current user's email and private message target's email
     2. Publishes to that person's pm inbox,
     3. Publishes a new message to our own inbox for us to find later on
     */
    vm.notAppPrivateMessage = function (email, firstName, text) {

      var hashedChannelName = vm.privateChannelHashCode(user.email, email);
      vm.notAppPublish(hashedChannelName, text);
      vm.notAppPublish(email, text);

      var newConvo = { "user": firstName,
        "email": email,
        "text": hashedMessageText };

      PubNub.ngPublish({
        channel: user.email,
        message: newConvo,
        callback: function(){}
      });

      setTimeout(function(){vm.notifs.clearPM();scope.$apply();}, 700);

    };



    /* Function: Not the app: Publishes to the  specified channel with the specified text*/
    vm.notAppPublish = function (channel, text) {

      //Publishes to pubnub the message
      PubNub.ngPublish({
        channel: channel,
        message: {
          "user": user.firstname,
          "email": user.email,
          "text": text
        }
      });
    };


    /* Funtion: Set's the inMessages boolean to specified value, 1 for in messages 0 for not */
    vm.setInMessages = function(val){
      vm.inMessages = val;
    };



    /* This is used to find the hashed channel between two emails, and returns that channel name
     How this is accomplished: The hashed channel name should be a format of the
     following: "email1+email2". We determine email one and two by alphabetizing the emails.
     Whichever is "higher" alphabetized is determined to be email1 and the other to be
     email2
     */
    vm.privateChannelHashCode = function (emailOne, emailTwo) {
      // variable declarations
      var shorterEmail;
      var longerEmail;
      var greaterThanEmail;
      var lessThanEmail;

      // determine which email is shorter
      if (emailOne.length <= emailTwo.length) {
        shorterEmail = emailOne;
        longerEmail = emailTwo;
      } else {
        shorterEmail = emailTwo;
        longerEmail = emailOne;
      }

      // initial assignments
      lessThanEmail = shorterEmail;
      greaterThanEmail = longerEmail;

      // compare each characters of the emails, if one email's character
      // is closer to the beginning compared to teh the other email, then we set
      // that as the "lessThan" email and the other as the "greaterThan" email
      for (var i = 0; i < shorterEmail.length; i++) {


        if (shorterEmail.charCodeAt(i) < longerEmail.charCodeAt(i)) {
          if(debug) console.log(shorterEmail.charCodeAt(i) + " vs " + longerEmail.charCodeAt(i));
          lessThanEmail = shorterEmail;
          greaterThanEmail = longerEmail;
          break;

        } else if (shorterEmail.charCodeAt(i) > longerEmail.charCodeAt(i)) {
          lessThanEmail = longerEmail;
          greaterThanEmail = shorterEmail;
          break;
        }
      }

      if(debug) console.log(lessThanEmail + '+&+' + greaterThanEmail);

      return lessThanEmail + '+&+' + greaterThanEmail;

    };

    /* Function: Given a unix time token, converts it to a date and returns a string */
    vm.getTime = function (token){

        token = Math.floor(token/timeConvert);

        var date = new Date(token);
        var hours = date.getHours();
        var day = date.getDate();
        var month = date.getMonth();

        switch (month+1) {
          case 1:
            month = 'Jan';
            break;
          case 2:
            month = 'Feb';
            break;
          case 3:
            month = 'Mar';
            break;
          case 4:
            month = 'Apr';
            break;
          case 5:
            month = 'May';
            break;
          case 6:
            month = 'Jun';
            break;
          case 7:
            month = 'Jul';
            break;
          case 8:
            month = 'Aug';
            break;
          case 9:
            month = 'Sep';
            break;
          case 10:
            month = 'Oct';
            break;
          case 11:
            month = 'Nov';
            break;
          case 12:
            month = 'Dec';
            break;
        }

        if(hours < 12){
          var period = ' am';
        } else {
          if (hours != 12) hours = hours - 12;
          var period = ' pm';
        }

        var minutes = "0" + date.getMinutes();

        return (month + ' ' + day + ' ' + hours + ':' + minutes.substr(-2) + period);

    };

    /* Function: checks if the pubNubService is initialized */
    vm.checkInitialized = function(){
      return pubNubInitialized;
    };

    return vm;

  }

}());
