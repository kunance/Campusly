'use strict';

/* Controllers */

angular.module('myApp.user', ['ngRoute'])

    // configure views; the authRequired parameter is used for specifying pages
    // which should only be available while logged in
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/account', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'user/account.tpl.html',
            controller: 'AccountCtrl'
        });

        $routeProvider.when('/login', {
            templateUrl: 'user/login.tpl.html',
            controller: 'LoginCtrl'
        });

        $routeProvider.when('/register', {
            templateUrl: 'user/register.tpl.html',
            controller: 'RegisterCtrl'
        });

        $routeProvider.when('/logout', {
            templateUrl: 'user/login.tpl.html',
            controller: 'LogoutCtrl'
        });

    }])

    .controller('LoginCtrl', ['$scope', 'loginService', '$location', function ($scope, loginService, $location, $modalInstance) {

        $scope.data = {
            email: null,
            pass: null,
            confirm: null
        };

        $scope.title = "Login";

        $scope.fblogin = function (cb) {
            loginService.fblogin(function (err, user) {
                $scope.err = err ? err + '' : null;
                if (!err) {
                    cb && cb(user);
                    if ($scope.$close)$scope.$close();
                }
            });
        };

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
                        if ($scope.$close){
                            $scope.$close();
                        }
                        else {
                            $location.path('/properties');
                        }
                    }
                });
            }
        };

        $scope.openRegisterModal = function(){
            if($scope.$dismiss){
                $scope.$dismiss({ openRegister : true });
            }
        }

    }])

    .controller('RegisterCtrl', ['$scope', 'loginService', '$location', function ($scope, loginService, $location, $modalInstance) {
        $scope.title = "Register";
        $scope.data = {};

        $scope.register = function () {
            $scope.err = null;
            if (assertValidRegisterAttempt()) {
                loginService.createAccount($scope.data.email, $scope.data.pass, function (err, user) {
                    if (err) {
                        $scope.err = err ? err + '' : null;
                    }
                    else {
                        loginService.login($scope.data.email, $scope.data.pass, function (err, user) {
                            $scope.err = err ? err + '' : null;
                            if (!err) {
                                loginService.createProfile(user.uid, { email: user.email, firstName: $scope.data.firstName, lastName: $scope.data.lastName, phone: $scope.data.phone}, function () {
                                    if ($scope.$close) {
                                        $scope.$close();
                                    }
                                    else {
                                        $location.path('/account');
                                    }
                                });
                            }
                        });
                    }
                });
            }
        };

        function assertValidRegisterAttempt() {
            if (!$scope.data.email) {
                $scope.err = 'Please enter a valid email address';
            }
            else if (!$scope.data.pass) {
                $scope.err = 'Please enter a password';
            }
            else if ($scope.data.pass !== $scope.data.confirm) {
                $scope.err = 'Passwords do not match';
            }
            else if (!$scope.data.firstName) {
                $scope.err = 'Please enter first name';
            }
            else if (!$scope.data.lastName) {
                $scope.err = 'Please enter last name';
            }
            else if (!$scope.data.phone) {
                $scope.err = 'Please enter phone number';
            }
            return !$scope.err;
        }

        $scope.openLoginModal = function(){
            if($scope.$dismiss){
                $scope.$dismiss({ openLogin : true });
            }
        }


    }])

    .controller('AccountCtrl', ['$scope', 'loginService', 'changeEmailService', 'firebaseRef', 'syncData', '$location', 'FBURL', 'TopBannerChannel', '$timeout', function ($scope, loginService, changeEmailService, firebaseRef, syncData, $location, FBURL, TopBannerChannel, $timeout) {

        var fbUser, fbUserReferences;

        $scope.profileMessage = 'Update Profile';
        $scope.referencesMessage = 'Update References';

        TopBannerChannel.setBanner({
            content: "Loading Data!",
            contentClass: "info"
        });

        $scope.profile = {};
        $scope.referenceList = { currentLandlord : {}, pastLandlord: {}, other: {}};
        $scope.properties = [];

        var setMyBids = function(properties){
            var propertiesRef = firebaseRef('properties');
            angular.forEach(properties, function(value, key) {
                propertiesRef.child(key).once('value', function(property){

                    var temp = property.val();
                    temp.id = key;

                    //get myBids
                    if(temp.bids[$scope.auth.user.uid]){
                        var myBids = [];
                        angular.forEach(temp.bids[$scope.auth.user.uid], function(value,key){
                            myBids.push(value);
                        });
                        temp.myBids = myBids.reverse();

                    }
                    else{
                        temp.myBids = [];
                    }

                    //get top bids
                    var topBids = {};
                    angular.forEach(temp.bids, function(pbids, user) {
                        angular.forEach(pbids, function(bid, id) {
                            this[user] = bid;
                        }, topBids);
                    });

                    temp.bids = [];
                    angular.forEach(topBids, function(bid, id) {
                        this.push(bid);
                    }, temp.bids);


                    $scope.properties.push(temp);
                    console.log(temp);
                    $scope.$apply();
                });
            });
        };

        if ($scope.auth.user && $scope.auth.user.uid) {

            fbUser = firebaseRef('users', $scope.auth.user.uid);
            fbUserReferences = firebaseRef('references', $scope.auth.user.uid);

            fbUser.once('value', function (user) {
                $scope.profile = user.val();
                $scope.$apply();
                if($scope.profile.properties){
                    setMyBids($scope.profile.properties);
                }
                TopBannerChannel.setBanner(null);
            });

            fbUserReferences.once('value', function (references) {
                if (references) {
                    angular.extend($scope.referenceList, references.val());
                    $scope.$apply();

                    TopBannerChannel.setBanner(null);
                }
            });

        }

        $scope.saveProfile = function () {

            $scope.profileMessage = "Updating Profile";

            TopBannerChannel.setBanner({
                content: "Updating profile...",
                contentClass: "info"
            });

            fbUser.set($scope.profile, function(error){

                if(error){
                    $scope.profileMessage = 'Update Error!';
                }
                else{
                    $scope.profileMessage = 'Update Success!';
                }

                $timeout(function(){
                    $scope.profileMessage = 'Update Profile';
                }, 3000);

                if(error){
                    TopBannerChannel.setBanner({
                        content: "There was an error while saving your profile. Please try again.",
                        contentClass: "danger"
                    });
                }
                else{
                    TopBannerChannel.setBanner({
                        content: "Profile updated!",
                        contentClass: "success"
                    });
                }
//
                $scope.$apply();
            });
        };

        $scope.saveReferences = function () {

            TopBannerChannel.setBanner({
                content: "Updating references...",
                contentClass: "info"
            });

            fbUserReferences.set($scope.referenceList, function(error){

                if(error){
                    $scope.referencesMessage = 'Update Error!';
                }
                else{
                    $scope.referencesMessage = 'Update Success!';
                }

                $timeout(function(){
                    $scope.referencesMessage = 'Update References';
                }, 3000);

                if(error){
                    TopBannerChannel.setBanner({
                        content: "There was an error while saving your references. Please try again.",
                        contentClass: "danger"
                    });
                }
                else{
                    TopBannerChannel.setBanner({
                        content: "References updated!",
                        contentClass: "success"
                    });
                }
                $("body").animate({scrollTop: 0}, "slow");

                $scope.$apply();
            });
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

        $scope.updatePassword = function () {
            $scope.reset();
            loginService.changePassword(buildPwdParms());
        };

        $scope.updateEmail = function () {
            $scope.reset();
            // disable bind to prevent junk data being left in firebase
            $scope.unBindUser();
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

        $scope.formatDate = function (date) {
            return moment(date).format("MMM DD, YYYY");
        };

    }])

    .controller('LogoutCtrl', ['$scope', 'loginService', '$location', 'TopBannerChannel', function ($scope, loginService, $location, TopBannerChannel) {
        loginService.logout();
        $location.path('/login');
    }]);