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

        $routeProvider.when('/register/:profile?', {
            templateUrl: 'user/register.tpl.html',
            controller: 'RegisterCtrl'
        });

        $routeProvider.when('/logout', {
            templateUrl: 'user/login.tpl.html',
            controller: 'LogoutCtrl'
        });

    }])

    .run(['$rootScope', 'syncData', function ($rootScope, syncData)
    {
             $rootScope.$on('$firebaseSimpleAuth:login', function (e, user)
             {
                    console.log('user profile',user);

                    $rootScope.profile= syncData('users/'+user.uid).$asObject();

                    $rootScope.profile.$loaded(function (profile)
                    {
                         $rootScope.secondaryNav= profile.type+'/partials/menu-'+profile.type+'.tpl.html';
                         profile.authEmail= user.email;
                         $rootScope.$broadcast('rented:profile',profile);
                    });
             });

             $rootScope.$on('$firebaseSimpleAuth:logout', function ()
             {
                    $rootScope.secondaryNav= null;

                    if ($rootScope.profile)
                    {
                        $rootScope.profile.$destroy();
                        $rootScope.profile= null;
                    }

                    $rootScope.$destroy();
             });
    }])

    .factory('rentedProfile',['$rootScope',function ($rootScope)
    {
         return function (cb)
         {
             if ($rootScope.profile===null)
               cb(null);
             else
             if ($rootScope.profile===undefined)
               $rootScope.$on('rented:profile',function (e,profile)
               {
                  cb(profile);
               });
             else
               cb($rootScope.profile);
         };
    }])

    .controller('LoginCtrl', ['$scope', 'loginService', '$location', 'TopBannerChannel', function ($scope, loginService, $location, TopBannerChannel, $modalInstance) {

        $scope.data = {
            email: null,
            pass: null,
            confirm: null
        };

        $scope.forgetPassword= function ()
        {
            if (!$scope.data.email) {
                $scope.err = 'Please enter an email addresss';
            }
            else {
                TopBannerChannel.setBanner({
                    content: 'Sending password reset email...',
                    contentClass: 'info'
                });

                loginService.passwordReset($scope.data.email, function(error) {
                  if (error === null)
                    TopBannerChannel.setBanner({
                        content: 'Password reset email sent!',
                        contentClass: 'success'
                    });
                  else
                  {
                    console.log('Error sending password reset email:', error);
                    $scope.err= 'An error occurred while sending the password reset email';
                  }
                });
            } 

            
        };

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
                    if (err) {
                      if (err.code=='INVALID_PASSWORD')
                        $scope.err= 'The specified password is incorrect.';
                      else
                      if (err.code=='INVALID_USER')
                        $scope.err= 'The specified user does not exist.';
                      else
                        $scope.err= err.message;
                    }
                    else {
                        cb && cb(user);

                        if ($scope.$close){
                            $scope.$close();
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

    .controller('RegisterCtrl', ['$scope', 'loginService', 'mailService', '$location', '$routeParams', function ($scope, loginService, mailService, $location, $routeParams, $modalInstance) {
        $scope.data = { profile: $routeParams.profile };

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
                            if (!err) 
                            {
                                var profile= { type: $scope.data.profile, email: user.email, firstName: $scope.data.firstName, lastName: $scope.data.lastName, phone: $scope.data.phone };

                                loginService.createProfile(user.uid, profile, function () {

                                    mailService.send(user.uid,
                                                     profile.type+'-welcome',
                                                     { fname: profile.firstName });

                                    $location.path('/');

                                    if ($scope.$close) {
                                        $scope.$close();
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
            else if ($scope.data.pass.length<8) {
                $scope.err = 'The password should be at least 8 characters long';
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
            else if (!$scope.data.profile) {
                $scope.err = 'Please select a profile';
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

    .controller('LogoutCtrl', ['$scope', 'loginService', '$location', '$timeout', 'TopBannerChannel', function ($scope, loginService, $location, $timeout, TopBannerChannel) {
        loginService.logout();
    }]);
