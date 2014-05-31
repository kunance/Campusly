angular.module('service.login', ['firebase', 'service.firebase'])

    .factory('loginService', ['$rootScope', '$firebaseSimpleLogin', 'firebaseRef', 'profileCreator', '$timeout',
        function ($rootScope, $firebaseSimpleLogin, firebaseRef, profileCreator, $timeout) {
            var auth = null;
            return {
                init: function () {
                    return auth = $firebaseSimpleLogin(firebaseRef());
                },

                fblogin : function(callback){
                    assertAuth();
                    auth.$login('facebook')
                    .then(function (user) {
                        if (callback) {
                            callback(null, user);
                        }
                    }, callback);
                },

                /**
                 * @param {string} email
                 * @param {string} pass
                 * @param {Function} [callback]
                 * @returns {*}
                 */
                login: function (email, pass, callback) {
                    assertAuth();
                    auth.$login('password', {
                        email: email,
                        password: pass,
                        rememberMe: true
                    }).then(function (user) {
                        if (callback) {
                            callback(null, user);
                        }
                    }, callback);
                },

                logout: function () {
                    assertAuth();
                    auth.$logout();
                },

                changePassword: function (opts) {
                    assertAuth();
                    var cb = opts.callback || function () {
                    };
                    if (!opts.oldpass || !opts.newpass) {
                        $timeout(function () {
                            cb('Please enter a password');
                        });
                    }
                    else if (opts.newpass !== opts.confirm) {
                        $timeout(function () {
                            cb('Passwords do not match');
                        });
                    }
                    else {
                        auth.$changePassword(opts.email, opts.oldpass, opts.newpass).then(function () {
                            cb && cb(null);
                        }, cb);
                    }
                },

                createAccount: function (email, pass, callback) {
                    assertAuth();
                    auth.$createUser(email, pass).then(function (user) {
                        callback && callback(null, user);
                    }, callback);
                },

                createProfile: profileCreator
            };

            function assertAuth() {
                if (auth === null) {
                    throw new Error('Must call loginService.init() before using its methods');
                }
            }
        }])

    .factory('profileCreator', ['firebaseRef', '$timeout', function (firebaseRef, $timeout) {
        return function (id, user, callback) {
            console.log(user);
            firebaseRef('users/' + id).set(user, function (err) {
                err && console.error(err);
                if (callback) {
                    $timeout(function () {
                        callback(err);
                    });
                }
            });
        };
    }]);
