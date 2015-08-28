(function () {
  "use strict";

  angular
    .module('app.roomDetail')
    .controller('RoomDetailCtrl', RoomDetailCtrl);

  RoomDetailCtrl.$inject = ['$q', 'common', '$scope', 'currentUser', 'distanceCalculator', '$stateParams', '$state', '$rootScope', '$timeout', 'RoomListingView', 'ngDialog'];

  function RoomDetailCtrl($q, common, $scope, currentUser, distanceCalculator, $stateParams, $state, $rootScope, $timeout, RoomListingView, ngDialog) {
    var vm = this;
    vm.property = {};
    vm.me = currentUser;

    vm.education = common.dataservice.getAllEducations(currentUser.id);
    vm.roomDetail = RoomListingView.get({id: $stateParams.param});
    var promises = [vm.education.$promise, vm.roomDetail.$promise];
    $q.all(promises).then(function () {
      initializeRoomDetailController()
    });

    function initializeRoomDetailController() {
      vm.creatorEmail = vm.roomDetail.roomDetails.relatedCreatorId.email;
      vm.creatorFacebook = vm.roomDetail.roomDetails.relatedCreatorId.facebook;
      vm.creatorFirstName = vm.roomDetail.roomDetails.relatedCreatorId.firstname;
      vm.creatorLastName = vm.roomDetail.roomDetails.relatedCreatorId.lastname;

      vm.allIds = ($stateParams.allIds).split(",").map(Number);
      var id = $stateParams.param;
      $rootScope.currentRoom =  vm.allIds.indexOf(+id);
      vm.next = function () {
        $rootScope.currentRoom += 1;
        $state.go('roomDetail',{param:vm.allIds[$rootScope.currentRoom], allIds:vm.allIds});
      };
      vm.previous = function () {
        $rootScope.currentRoom -= 1;
        $state.go('roomDetail',{param:vm.allIds[$rootScope.currentRoom], allIds:vm.allIds});
      };

      vm.confirmed = 0;
      vm.unconfirmed = 0;
      common.dataservice.getAllRoommates(vm.roomDetail.roomDetails.creatorId).$promise.then(function (data) {
        vm.creatorRoommates = data;
        angular.forEach(vm.creatorRoommates, function (roommate) {
          roommate.confirmed ? vm.confirmed += 1 : vm.unconfirmed += 1;
        });
      });

    var source = vm.education.relatedUniversityId;
    var destination = vm.roomDetail.propertyDetails.coords;
    if (vm.education.id) {
      var timer = $timeout(function () {
      distanceCalculator.calculateDistanceForEveryTransport(source, destination, 'duration')
        .then(function (data) {
        vm.duration = data;
      })
        .catch(function (err) {
        });
      distanceCalculator.calculateDistanceForEveryTransport(source, destination, 'distance')
        .then(function (data) {
        vm.distance = data;
      })
        .catch(function (err) {
        });
    },2000)
    }

    /*
     *  ngDialog
     */
    $scope.open = function (emailAddress, firstname, lastname) {
      ngDialog.open({
        template: 'aroundYouMessage',
        controller: 'ngDialogCtrl',
        data: {
          email: emailAddress,
          firstName: firstname,
          lastName: lastname}
      });
    };

    mixpanel.track("roomDetail view");
    mixpanel.people.increment('roomDetail view');

    $scope.$on("$destroy", function() {
        $timeout.cancel(timer);
      }
    );

    }

  }
}());

