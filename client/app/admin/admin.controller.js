(function () {
  "use strict";

  angular
    .module('RentedApp')
    .controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$scope', '$http', 'Auth', 'User'];

  function AdminCtrl($scope, $http, Auth, User) {

      // Use the User $resource to fetch all users
      $scope.users = User.query();

      $scope.delete = function(user) {
        User.remove({ id: user.id });
        angular.forEach($scope.users, function(u, i) {
          if (u === user) {
            $scope.users.splice(i, 1);
          }
        });
      };
    }


}());
