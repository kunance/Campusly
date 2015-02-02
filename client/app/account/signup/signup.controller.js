'use strict';

angular.module('baseCodeSqlApp')
  .controller('SignupCtrl', function($scope, Auth, $state, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.createUser({
          firstname: $scope.user.firstname,
          lastname: $scope.user.lastname,
          middlename: $scope.user.middlename,
          username: $scope.user.username,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function() {
          // Account created, redirect to home
          $state.go('main');
        })
        .catch(function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the sequelize errors
          if (err.name) {
            angular.forEach(err.fields, function(field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = err.message;
            });
          }
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
