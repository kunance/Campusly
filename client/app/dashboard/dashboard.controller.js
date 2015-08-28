(function() {

  "use strict";

  angular
  .module('app.dashboard')
  .controller('DashboardCtrl',DashboardCtrl);

  DashboardCtrl.$inject= ['common', '$scope', 'currentUser', 'RoomListingView', 'UserResource', 'RoomListing', '$q', 'Lookings', 'screenSize', 'ngDialog'];

  function DashboardCtrl(common, $scope, currentUser, RoomListingView, UserResource, RoomListing, $q, Lookings, screenSize, ngDialog) {
    var vm = this;
    vm.me = currentUser;
    vm.userLookings = common.dataservice.getAllLookings(currentUser.id);
    vm.myRoomListings = RoomListing.query({userId: currentUser.id});
    vm.numberOf = common.dataservice.getRequests(currentUser.id);
    var aroundYouLimit;
    if (screenSize.is('xs')){
      aroundYouLimit = 6;
    }
    else {
      aroundYouLimit = 12;
    }
    vm.aroundYou = UserResource.aroundMe({distance: (1609 * (currentUser.experianIdToken || 1)), limit: aroundYouLimit});
    vm.address = common.dataservice.getAllAddresses(currentUser.id);
    vm.userStatus = common.dataservice.getStatus(currentUser.id);
    vm.education = common.dataservice.getAllEducations(currentUser.id);
    var promises = [vm.userLookings.$promise, vm.myRoomListings.$promise, vm.numberOf.$promise, vm.aroundYou.$promise, vm.address.$promise, vm.userStatus.$promise, vm.education.$promise];
    $q.all(promises).then(function () {
      initializeDashboardController()
    });

    function initializeDashboardController() {
      vm.initialized = true;
      var action = '';
      vm.userStatus.id ? action = 'update' : action = 'save';
      vm.me.experianIdToken = vm.me.experianIdToken || 1;
      vm.searchCriteria = {
        maxMonthlyPrice: null, leaseType: null, maxCurrentRoomates: null,
        propertyType: null, sharedBathroom: null, roomType: null,
        furnished: null, smokingAllowed: null, gender: null,
        petsAllowed: null, parkingAvailable: null,
        within: {
          distance: 100, place: {type: 'univ', id: vm.education.universityId}
        }
      };
      vm.myRoomListingsIds = [];
      angular.forEach(vm.myRoomListings, function (myRoom) {
        vm.myRoomListingsIds.push(myRoom.id);
      });
      vm.myLookingsIds = [];
      angular.forEach(vm.userLookings, function (myLookings) {
        vm.myLookingsIds.push(myLookings.id);
      });
      vm.sortOrder = 'descending';
      vm.sortBy = 'createdAt';
      var roomLimit;

      if (screenSize.is('xs')){
        roomLimit = 6;
      }
      else {
        roomLimit = 9;
      }

      RoomListingView.query({sortBy: vm.sortBy, sortOrder: vm.sortOrder, search: vm.searchCriteria, univId: vm.education.universityId, limit: roomLimit})
        .$promise
        .then(function (availRooms) {
          vm.allIds = [];
          vm.allRoomCreators = [];
          var i = 0;
          vm.availableRooms = availRooms;
          angular.forEach(vm.availableRooms, function (room) {
            vm.allIds.push(room.roomDetails.id);
            RoomListingView.get({id: room.roomDetails.id},function(room) {
              //on success callback function
              vm.availableRooms[i].relatedCreatorId = room.roomDetails.relatedCreatorId;
              i++;
            });
          });
          orderSliderButtons();
        })
        .catch(function () {
          //vm.noUniversity = true;
        });

      Lookings.query({sortBy: vm.sortBy, sortOrder: vm.sortOrder, univId: vm.education.universityId, limit: 6})
        .$promise
        .then(function (lookings) {
          vm.allLookingIds = [];
          vm.lookingRoom = lookings;
          angular.forEach(lookings, function (looking) {
            vm.allLookingIds.push(looking.id);
          });
        })
        .catch(function (err) {
          common.logger.error('Error getting student looking', err)
        });

      var j = 0;
      angular.forEach(vm.aroundYou, function() {
          vm.aroundYou[j].message = "";
          j++;
        });

      vm.updateStatus = function (form, data) {
        if (action == 'save') {
          common.dataservice.addStatus(vm.me.id, data)
            .$promise
            .then(function (status) {
              action = 'update';
              vm.userStatus = status;
              common.logger.success('Your status is updated');
            })
            .catch(function (err) {
              common.logger.error('error updating status', err);
            })
        }
        if (action == 'update') {
          common.dataservice.editStatus(vm.me.id, vm.userStatus.id, data)
            .$promise
            .then(function (status) {
              vm.userStatus = status;
              common.logger.success('Your status is updated');
            })
            .catch(function (err) {
              common.logger.error('error updating status', err);
            })
        }
      };

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

       /*
       *  prerender.io
       */
      $scope.$parent.seo = {
        pageTitle: 'Campusly Home',
        pageDescription: 'Your campus community'
      };
      /*
       *  breakpoints and slider options
       */
      vm.breakpoints = {
        availableRooms: [
          {
            breakpoint: 1224,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          }, {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
          , {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          , {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],
        lookingRoom: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 3
            }
          }, {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          , {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          , {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }],
        aroundYou: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4
            }
          }, {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
          , {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          , {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

      function orderSliderButtons() {
        setTimeout(function () {
          $(".slider").each(function (index) {
            var slider = $(".slider").eq(index);
            var dotsX = parseInt(slider.find(".slick-dots").css("left"));
            var dotsSize = parseInt(slider.find(".slick-dots").css("width"));
            var nextBtnX = dotsX + dotsSize + 10;
            slider.find(".slick-next").css("left", nextBtnX);
          });
        }, 1000);
      }

      $(window).resize(function () {
        orderSliderButtons();
      });

      angular.element(document).ready(function () {
        orderSliderButtons();
      });

      mixpanel.track("dashboard");
      mixpanel.people.increment('dashboard');
      mixpanel.identify(vm.me.email);
      mixpanel.people.set_once({
        "$email": vm.me.email,
        "$first_name": vm.me.firstname,
        "$last_name": vm.me.lastname,
        "$created": vm.me.createdAt,
        "$phone": vm.me.phone,
        "$first_login": new Date()
      });
      mixpanel.people.set({
        "$last_login": new Date()
      });

    }
  }

}());
