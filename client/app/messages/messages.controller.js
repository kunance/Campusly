(function() {

  "use strict";

  angular
  .module('app.messages')
  .controller('MessageCtrl',MessageCtrl);

  MessageCtrl.$inject= ['common', '$scope', 'currentUser', 'UserResource', '$q', 'PubNub'];

  function MessageCtrl(common, $scope, currentUser, UserResource, $q, PubNub) {
    var vm = this;
    vm.me = currentUser;

    /*
     * PubNub init code
     * Keys used are from Sandbox - TODO - change before launching
     * Stored in variable pubnub
     */
    var pubnub = PubNub.init({
      publish_key:'pub-c-cd12098a-7ff3-4558-921b-c4c7a70ed47a',
      subscribe_key:'sub-c-fb61f4f0-2402-11e5-8463-02ee2ddab7fe',
      //uuid: vm.me.email, //use existing user's ID as the UUID - unique user ID
      ssl: true
    });

    /*
     * Start first chat code here
     */
    pubnub.subscribe({
      channel: 'my_channel',
      message: function(m){console.log(m)},
      error: function (error) {
        // Handle error here
        console.log(JSON.stringify(error));
      }
    });

    pubnub.publish({
      channel: 'my_channel',
      message: 'Hello from the PubNub Javascript SDK!',
      callback : function(m){console.log(m)}
    });

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
