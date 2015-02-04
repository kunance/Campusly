'use strict';

angular.module('baseCodeSqlApp')
  .controller('MainCtrl', function($rootScope, $scope, $http, socket) {
    $scope.awesomeThings = [];

    $rootScope.seo = {
      pagetitle : 'aa', pageDescription : 'bb'
    };

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if ($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing.id);
    };

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  });
