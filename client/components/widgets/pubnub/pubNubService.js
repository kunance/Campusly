/**
 * Created by vinitmodi on 8/7/15.
 */
(function () {

  'use strict';

  angular
    .module('app.widgets')
    .service('pubNubService', pubNubService);

  pubNubService.$inject = ['common', '$q', 'PubNub', 'Auth'];

  function pubNubService(common, $q, PubNub, currentUserService) {

    var user = currentUserService.getCurrentUser();

    if(user.email){
      PubNub.init({
        publish_key: 'pub-c-cd12098a-7ff3-4558-921b-c4c7a70ed47a',
        subscribe_key: 'sub-c-fb61f4f0-2402-11e5-8463-02ee2ddab7fe',
        uuid: user.email, //use existing user's ID as the UUID - unique user ID
        ssl: true,
        callback: console.log('pubnut init')
      });
    }

    user.education = common.dataservice.getAllEducations(user.id);

    var promises = [user.education.$promise];

    var scope = {};

    var vm = {};
    vm.inMessages = 0;
    vm.notifs = {};


    var retVal = {};
    $q.all(promises).then(function (retVal) {
      /*
       * Only initialize the PubNub message controller if the university is set.
       * If user has no university then they are prompted to update university before initializing
       */
      if (user.education.universityId) {
        retVal.ret = initializeChat();

        return retVal;

      }
    });

    function initializeChat() {

      vm.groupChannelInitialization = function () {
        /*
         * Identify list of default channels
         * Format: University + Channel Name
         */
        var universityChannel = JSON.stringify("#" + vm.education.relatedUniversityId.shortName);
        var careerCenterChannel = JSON.stringify("#" + vm.education.relatedUniversityId.shortName + " Career Center");
        var resLifeChannel = JSON.stringify("#" + vm.education.relatedUniversityId.shortName + " ResLife");
        var academicAdvisingChannel = JSON.stringify("#" + vm.education.relatedUniversityId.shortName + " Academic Advising");
        var finAidChannel = JSON.stringify("#" + vm.education.relatedUniversityId.shortName + " Financial Aid");

        /*
         * Remove quotation from the JSON stringify
         */
        var universityChannelText = vm.replaceQuotesFunction(universityChannel);
        var careerCenterChannelText = vm.replaceQuotesFunction(careerCenterChannel);
        var resLifeChannelText = vm.replaceQuotesFunction(resLifeChannel);
        var academicAdvisingChannelText = vm.replaceQuotesFunction(academicAdvisingChannel);
        var finAidChannelText = vm.replaceQuotesFunction(finAidChannel);

        /*
         * Assign channel names to the groupChannels array
         */
        //vm.groupChannels = [
        //  { "name": universityChannelText,
        //    "new": 0,
        //    "selected": 0},
        //
        //  { "name": careerCenterChannelText,
        //    "new": 0,
        //    "selected": 0},
        //
        //  { "name": resLifeChannelText,
        //    "new": 0,
        //    "selected": 0},
        //
        //  { "name": academicAdvisingChannelText,
        //    "new": 0,
        //    "selected": 0},
        //
        //  { "name": finAidChannelText,
        //    "new": 0,
        //    "selected": 0}
        //];


        vm.housingGroups = ["Tercero", "Building A", "Floor 99"];
        vm.subscribeToHousingGroups([universityChannelText, careerCenterChannelText, resLifeChannelText, academicAdvisingChannelText,
          finAidChannelText]);

        vm.subscribeToRAChannel();
        vm.subscribeToHousingGroups(vm.housingGroups);
      };


      /* Function: For the private message inbox, grab older chat history and evaluate

       1. Using the oldest inbox timetoken, we make a call to pubnub history.
       2. With the returned messages array, we call evaluateOldPrivateMessage on each message
       3. Set the new oldest inbox time token to the time token of the oldest message
       */
      vm.grabInboxHistory = function () {

        var retrievedHistory = [];

        PubNub.jsapi.history({
          channel: /*vm.me.email*/ email,
          reverse: false,
          //start: vm.oldestInboxTimeToken,
          include_token: true,
          callback: function (m) {
            retrievedHistory = m[0];

            console.log('retrived history');
            //for (var i = 0; i<retrievedHistory.length; i++) {
            //  vm.evaluateOldPrivateMessage(retrievedHistory[i].message);
            //}

            //vm.oldestInboxTimeToken = m[1];
            console.log(retrievedHistory);
          }
        });
        // returns: [[message1, message2, ...], oldestTimeToken, newestTimeToken
      };


      console.log('pubnub service called');
      return vm;

    };

    /*-------------------------------------------------------------------------------*/

    vm.setNotifsAndScope = function (notifs, scoper){
      vm.notifs = notifs;
      scope = scoper;
    };

    vm.clearNotifs = function(){
      setTimeout(function(){vm.notifs.pmNotif = 0;scope.$apply();}, 1000);
    };


    /* Function: Initializes pubnub if there is a user

      1. Checks if the user email is null
      2. If so, then retrieve new user.
      3. Then initialize PubNub
     */
    vm.notAppUpdateUser = function(){
      console.log(user.email);

      if(user.email == null){
        user = currentUserService.getCurrentUser();

        PubNub.init({
          publish_key: 'pub-c-cd12098a-7ff3-4558-921b-c4c7a70ed47a',
          subscribe_key: 'sub-c-fb61f4f0-2402-11e5-8463-02ee2ddab7fe',
          uuid: user.email, //use existing user's ID as the UUID - unique user ID
          ssl: true,
          callback: console.log('pubnut init')
        });
      }
    };


    /* Function: notApp - subscribes to one's personal channel
    *    1. Subscribes to th user's inbox
    *    2. If not in messages, then execute
    *    2. Messages execute the new pm method and along with scope apply
    *
     */
    vm.notAppPrivateSubscribe = function () {

      if (PubNub) {

      console.log('private message notifs');

      // Subscribe to the channel via PubNub
      PubNub.ngSubscribe({
        channel: user.email,
        message: function (message) {

          if(vm.inMessages == 0) {
            vm.notifs.newPM();
            console.log('new message');
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

            mostRecentMessageTime = Number(m[1]);
            console.log('email time token = ' + mostRecentMessageTime);

          }
        });

        PubNub.jsapi.history({
          channel: user.email + '_timeTokens',
          count: 1,
          reverse: false,
          include_token: true,
          callback: function (m) {

            mostRecentCheck = Number(m[1]);
            console.log('latest read time token = ' + mostRecentCheck);

          }
        });

        setTimeout(function () {

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
            mostRecentCheck = Math.floor(mostRecentCheck/10000);

            console.log('latest read time token = ' + mostRecentCheck);
            console.log('current time is          '+ currentTime);


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
        console.log('current time');
        console.log(d.getTime());
      }




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
        "text": "" };

      PubNub.ngPublish({
        channel: user.email,
        message: newConvo,
        callback: function(){
          vm.notifs.clearPM;
        }
      });
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
          console.log(shorterEmail.charCodeAt(i) + " vs " + longerEmail.charCodeAt(i));
          lessThanEmail = shorterEmail;
          greaterThanEmail = longerEmail;
          break;

        } else if (shorterEmail.charCodeAt(i) > longerEmail.charCodeAt(i)) {
          lessThanEmail = longerEmail;
          greaterThanEmail = shorterEmail;
          break;
        }
      }

      console.log(lessThanEmail + '+&+' + greaterThanEmail);

      return lessThanEmail + '+&+' + greaterThanEmail;

    };

    return vm;

  }

}());
