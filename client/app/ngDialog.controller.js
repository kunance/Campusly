/**
 * Created by aayang on 8/26/15.
 */
(function() {

  "use strict";

  angular
    .module('RentedApp')
    .controller('ngDialogCtrl', ngDialogCtrl);

  ngDialogCtrl.$inject= ['$scope','pubNubService', 'ngDialog'];

  function ngDialogCtrl($scope, pubNubService, ngDialog) {
    var debug = false;
    var vm = this;

    initializeDialogController();


    function initializeDialogController() {

      if(debug)
      console.log('sup from ngDialougue controller');

      $scope.sendMessage = function(text, email, firstName, lastName){

        var fullName = firstName + ' ' + lastName;


        if(debug) {
          console.log(text);
          console.log(email);
          console.log(fullName);
        }

        pubNubService.notAppPrivateMessage(email, fullName, text);
        pubNubService.clearNotifs();
        $scope.messageSent = "Your message has been sent! :)"
      };

    }
  }

}());
