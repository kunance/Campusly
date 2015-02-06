'use strict';

angular
  .module('RentedApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$scope', '$http', 'socket'];

function MainCtrl($rootScope, $scope, $http, socket) {
  var vm = this;
  vm.address = {};

    //$scope.awesomeThings = [];
    //
    //$http.get('/api/things').success(function(awesomeThings) {
    //  $scope.awesomeThings = awesomeThings;
    //  socket.syncUpdates('thing', $scope.awesomeThings);
    //});
    //
    //$scope.addThing = function() {
    //  if ($scope.newThing === '') {
    //    return;
    //  }
    //  $http.post('/api/things', { name: $scope.newThing });
    //  $scope.newThing = '';
    //};
    //
    //$scope.deleteThing = function(thing) {
    //  $http.delete('/api/things/' + thing.id);
    //};
    //
    //$scope.$on('$destroy', function() {
    //  socket.unsyncUpdates('thing');
    //});


  }
