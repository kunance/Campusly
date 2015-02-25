//(function () {
//  "use strict";
//
//  angular.module('app.core')
//    .factory('RoomListing', function ($resource) {
//      return $resource('/api/users/:userId/roomListing/:id', {userId:'@userId', id: '@id'},
//        {
//          getAllRoomListings: {
//            method: 'GET',
//            isArray:true,
//            params: {
//              id:'all'
//            }
//          },
//          editRoomListing: {
//            method: 'PUT'
//          }
//        }
//      );
//    });
//
//}());
//
//
//
//
