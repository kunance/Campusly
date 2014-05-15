'use strict';

/* Controllers */

angular.module('myApp.user', ['ngRoute'])

    // configure views; the authRequired parameter is used for specifying pages
    // which should only be available while logged in
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/account', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'user/partials/account.tpl.html',
            controller: 'AccountCtrl'
        });

        $routeProvider.when('/login', {
            templateUrl: 'user/partials/login.tpl.html',
            controller: 'LoginCtrl'
        });

        $routeProvider.when('/logout', {
            templateUrl: 'user/partials/login.tpl.html',
            controller: 'LogoutCtrl'
        });

    }])

    .controller('LoginCtrl', ['$scope', 'loginService', '$location', function ($scope, loginService, $location, $modalInstance) {

        $scope.data = {
            email:null,
            pass:null,
            confirm:null
        };
        $scope.createMode = false;
        $scope.title = "Login/Register";

        console.log($scope);

        $scope.login = function (cb) {
            $scope.err = null;
            if (!$scope.data.email) {
                $scope.err = 'Please enter an email addresss';
            }
            else if (!$scope.data.pass) {
                $scope.err = 'Please enter a password';
            }
            else {
                loginService.login($scope.data.email, $scope.data.pass, function (err, user) {
                    $scope.err = err ? err + '' : null;
                    if (!err) {
                        cb && cb(user);
                        if($scope.$close)$scope.$close();
                    }
                });
            }
        };

        $scope.createAccount = function () {
            $scope.err = null;
            if (assertValidLoginAttempt()) {
                loginService.createAccount($scope.data.email, $scope.data.pass, function (err, user) {
                    if (err) {
                        $scope.err = err ? err + '' : null;
                    }
                    else {
                        // must be logged in before I can write to my profile
                        $scope.login(function () {
                            loginService.createProfile(user.uid, user.email);
                            if($scope.$close){
                                $scope.$close();
                            }
                            else {
                                $location.path('/account');
                            }
                        });
                    }
                });
            }
        };

        function assertValidLoginAttempt() {
            if (!$scope.data.email) {
                $scope.err = 'Please enter an email address';
            }
            else if (!$scope.data.pass) {
                $scope.err = 'Please enter a password';
            }
            else if ($scope.data.pass !== $scope.data.confirm) {
                $scope.err = 'Passwords do not match';
            }
            return !$scope.err;
        }
    }])

    .controller('AccountCtrl', ['$scope', 'loginService', 'changeEmailService', 'firebaseRef', 'syncData', '$location', 'FBURL', '$rootScope', 'TopBannerChannel', function ($scope, loginService, changeEmailService, firebaseRef, syncData, $location, FBURL, $rootScope, TopBannerChannel) {

        $scope.user = $rootScope.user;

        $rootScope.$watch('user', function(newValue, oldValue) {

            if(!angular.equals(newValue, $scope.user)){
                $scope.user = newValue;
            }
        });

        // set initial binding
        $rootScope.syncAccount = function(){};

        $scope.logout = function () {
            loginService.logout();
        };

        $scope.oldpass = null;
        $scope.newpass = null;
        $scope.confirm = null;

        $scope.reset = function () {
            $scope.err = null;
            $scope.msg = null;
            $scope.emailerr = null;
            $scope.emailmsg = null;
        };

        $scope.updateUser = function(){
            var newValue = $rootScope.user;
            if (!newValue || (newValue && newValue.phone && newValue.name)) {
                TopBannerChannel.setBanner(null);
            }
            else{
                console.log("setting banner");
                TopBannerChannel.setBanner({
                    content: $templateCache.get('user/partials/banner.tpl.html'),
                    contentClass: "danger"
                });
            }
        };

        $scope.updatePassword = function () {
            $scope.reset();
            loginService.changePassword(buildPwdParms());
        };

        $scope.updateEmail = function () {
            $scope.reset();
            // disable bind to prevent junk data being left in firebase
            $rootScope.unBindUser();
            changeEmailService(buildEmailParms());
        };

        function buildPwdParms() {
            return {
                email: $scope.auth.user.email,
                oldpass: $scope.oldpass,
                newpass: $scope.newpass,
                confirm: $scope.confirm,
                callback: function (err) {
                    if (err) {
                        $scope.err = err;
                    }
                    else {
                        $scope.oldpass = null;
                        $scope.newpass = null;
                        $scope.confirm = null;
                        $scope.msg = 'Password updated!';
                    }
                }
            };
        }

        function buildEmailParms() {
            return {
                newEmail: $scope.newemail,
                pass: $scope.pass,
                callback: function (err) {
                    if (err) {
                        $scope.emailerr = err;
                        // reinstate binding
                        $scope.syncAccount();
                    }
                    else {
                        // reinstate binding
                        $scope.syncAccount();
                        $scope.newemail = null;
                        $scope.pass = null;
                        $scope.emailmsg = 'Email updated!';
                    }
                }
            };
        }

    }])

    .controller('LogoutCtrl', ['$scope', 'loginService', '$location', 'TopBannerChannel', function ($scope, loginService, $location, TopBannerChannel) {
        loginService.logout();
        $location.path('/login');
    }]);