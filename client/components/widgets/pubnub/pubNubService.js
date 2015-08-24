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

    user.education = common.dataservice.getAllEducations(user.id);

    var promises = [user.education.$promise];

    var vm = {};

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

    PubNub.init({
      publish_key: 'pub-c-cd12098a-7ff3-4558-921b-c4c7a70ed47a',
      subscribe_key: 'sub-c-fb61f4f0-2402-11e5-8463-02ee2ddab7fe',
      uuid: user.email, //use existing user's ID as the UUID - unique user ID
      ssl: true,
      callback: console.log('pubnut init')
    });


    /* Function: notApp - subscribes to one's personal channel */


    vm.notAppPrivateSubscribe = function (notifs) {

      // Subscribe to the channel via PubNub
      PubNub.ngSubscribe({
        channel: user.email,
        restore: true,
        message: function (message) {
          notifs.newPM();
          console.log('new message');

        }
      });
    };


    /* currentSubscribe to a private messaging channel

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
        message: newConvo
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

    console.log(user);
    return vm;

  }

}());
