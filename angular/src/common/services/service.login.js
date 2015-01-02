angular.module('service.login', ['firebase', 'service.firebase'])
    .factory('loginService', ['$rootScope', 'firebaseRef', 'profileCreator', '$timeout',
        function ($rootScope, firebaseRef, profileCreator, $timeout) {
            var auth = firebaseRef();

            return {
                init: function () {
                },

                fblogin : function(callback){
                   // assertAuth();
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
                   // assertAuth();
                    firebaseRef().authWithPassword({
                        email: email,
                        password: pass
                    }, function (error, authData) {
                        if (error) {
                            console.log("Login Failed!", error);
                            $rootScope.auth.error = error;
                            $rootScope.$broadcast("fbase:error", error);
                        } else {
                            console.log("Authenticated successfully with payload:", authData);
                       //     console.log("Login callback: ", callback);
                            $rootScope.auth.user = authData;
                            $rootScope.$broadcast("fbase:login", authData);
                            if(callback) {
                                callback(null, authData);
                            }
                        }
                    }, {rememberMe: true});
                },

                logout: function () {
                   // assertAuth();
                   // auth.$logout();
                    firebaseRef().unauth();
                    $rootScope.$broadcast("fbase:logout");
                },

                passwordReset: function (email,cb) {
                   // assertAuth();
                   // auth.$sendPasswordResetEmail(email).then(function () {
                   //     cb && cb(null);
                   // }, cb);
                    firebaseRef().resetPassowrd(email, function () {
                        cb && cb(null);
                    });
                },

                changePassword: function (opts) {
                   // assertAuth();
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
                   // assertAuth();
                    auth.$createUser(email, pass).then(function (user) {
                        callback && callback(null, user);
                    }, callback);
                },

                createProfile: profileCreator,

                fetchProfile: function (id)
                {
                    console.log("Gonna fetch the profile for id: ", id);
                    var ref= firebaseRef('users',id),
                        profile= { $id: id },
                        extend= function (data)
                        {
                             _.extend(profile,data.val());

                             _.defer(function () { $rootScope.$apply() });
                        };

                    ref.on('value',extend,
                    function (err)
                    {
                        console.log('reference to users/'+id+' canceled',err);
                    });

                    $rootScope.$on('$destroy', function ()
                    {
                        ref.off('value',extend);
                    });

                    return profile;
                }

            };

            //function assertAuth() {
            //    if (auth === null) {
            //        throw new Error('Must call loginService.init() before using its methods');
            //    }
            //}
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
