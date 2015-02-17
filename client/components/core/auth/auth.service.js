(function () {
  "use strict";

  angular.module('app.core')
    .factory('Auth', function Auth($http, UserResource, $cookieStore, $q, Local, $localStorage, $state) {
      /**
       * Return a callback or noop function
       *
       * @param  {Function|*} cb - a 'potential' function
       * @return {Function}
       */
      var safeCb = function(cb) {
          return (angular.isFunction(cb)) ? cb : angular.noop;
        },

        currentUser = {};

      if ($cookieStore.get('token')) {
        currentUser = UserResource.get();
      }

      return {

        /**
         * Authenticate user and save token
         *
         * @param  {Object}   user     - login info
         * @param  {Function} callback - optional, function(error)
         * @return {Promise}
         */
        login: function(user, callback) {
          return $http.post('/auth/local', {
            email: user.email,
            password: user.password
          })
            .then(function(res) {
              $cookieStore.put('token', res.data.token);
              currentUser = UserResource.get();
              safeCb(callback)();
              return res.data;
            }, function(err) {
              this.logout();
              safeCb(callback)(err.data);
              return $q.reject(err.data);
            }.bind(this));
        },

        /**
         * Delete access token and user info
         */
        logout: function() {
          $cookieStore.remove('token');
          currentUser = {};
        },

        /**
         * Create a new user
         *
         * @param  {Object}   user     - user info
         * @param  {Function} callback - optional, function(error, user)
         * @return {Promise}
         */
        createUser: function(user, callback) {
          return UserResource.save(user,
            function(data) {
              $cookieStore.put('token', data.token);
              currentUser = UserResource.get();
              return safeCb(callback)(null, user);
            },
            function(err) {
              this.logout();
              return safeCb(callback)(err);
            }.bind(this)).$promise;
        },

        updateUser: function(user, callback) {
          return UserResource.changeInfo({id: currentUser.id}, user,
            function(usr) {
              return safeCb(callback)(null, usr);
            },
            function(err) {
              return safeCb(callback)(err);
            }).$promise;
        },

        /**
         * Change password
         *
         * @param  {String}   oldPassword
         * @param  {String}   newPassword
         * @param  {Function} callback    - optional, function(error, user)
         * @return {Promise}
         */
        changePassword: function(oldPassword, newPassword, callback) {
          return UserResource.changePassword({ id: currentUser.id }, {
            oldPassword: oldPassword,
            newPassword: newPassword
          }, function(user) {
            return safeCb(callback)(null, user);
          }, function(err) {
            return safeCb(callback)(err);
          }).$promise;
        },

        /**
         * Gets all available info on a user
         *   (synchronous|asynchronous)
         *
         * @param  {Function|*} callback - optional, function(user)
         * @return {Object|Promise}
         */
        getCurrentUser: function(callback) {
          if (arguments.length === 0) {
            return currentUser;
          }
          var value = (currentUser.hasOwnProperty('$promise')) ? currentUser.$promise : currentUser;
          return $q.when(value)
            .then(function(user) {
              safeCb(callback)(user);
              return user;
            }, function() {
              safeCb(callback)({});
              return {};
            });
        },

        getUser: function (userId, data) {
          return UserResource.get({userId: userId}, data,
            function (res) {
              return res;
            }, function (err) {
              //handle exception
            });
        },

        /**
         * Check if a user is logged in
         *   (synchronous|asynchronous)
         *
         * @param  {Function|*} callback - optional, function(is)
         * @return {Bool|Promise}
         */
        isLoggedIn: function(callback) {
          if (arguments.length === 0) {
            return currentUser.hasOwnProperty('role');
          }

          return this.getCurrentUser(null)
            .then(function(user) {
              var is = user.hasOwnProperty('role');
              safeCb(callback)(is);
              return is;
            });
        },

        /**
         * Check if a user is an admin
         *   (synchronous|asynchronous)
         *
         * @param  {Function|*} callback - optional, function(is)
         * @return {Bool|Promise}
         */
        isAdmin: function(callback) {
          if (arguments.length === 0) {
            return currentUser.role === 'admin';
          }

          return this.getCurrentUser(null)
            .then(function(user) {
              var is = user.role === 'admin';
              safeCb(callback)(is);
              return is;
            });
        },

        /**
         * Get auth token
         *
         * @return {String} - a token string used for authenticating
         */
        getToken: function() {
          return $cookieStore.get('token');
        },

        /**
         * Confirm mail
         *
         * @param  {String}   mailConfirmationToken
         * @param  {Function} callback    - optional
         * @return {Promise}
         */
        confirmMail: function(mailConfirmationToken, callback) {
          var cb = callback || angular.noop;
          return Local.confirmMail({
            mailConfirmationToken: mailConfirmationToken
          }, function(data) {
            $localStorage.token = data.token;
            currentUser = UserResource.get();
            return cb(currentUser);
          }, function(err) {
            return cb(err);
          }).$promise;
        },

        /**
         * Check if a user's mail is confirmed
         *
         * @return {Boolean}
         */
        isMailconfirmed: function() {
          return currentUser.confirmedEmail;
        },

        /**
         * Confirm mail
         *
         * @param  {Function} callback    - optional
         * @return {Promise}
         */
        sendConfirmationMail: function(callback) {
          var cb = callback || angular.noop;

          return Local.verifyMail(function(user) {
            return cb(user);
          }, function(err) {
            return cb(err);
          }).$promise;
        },

        /**
         * Send Reset password Mail
         *
         * @param  {String}   email address
         * @param  {Function} callback    - optional
         * @return {Promise}
         */
        sendPwdResetMail: function(email, newPassword, callback) {
          var cb = callback || angular.noop;
          return Local.resetPassword({
            email: email,
            newPassword : newPassword
          }, function(user) {
            return cb(user);
          }, function(err) {
            return cb(err);
          }).$promise;
        },

        /**
         * Change reseted password
         *
         * @param  {String}   passwordResetToken
         * @param  {String}   newPassword
         * @param  {Function} callback    - optional
         * @return {Promise}
         */
        confirmResetedPassword: function(passwordResetToken, callback) {
          var cb = callback || angular.noop;

          return Local.confirmPassword({
            passwordResetToken: passwordResetToken,
          }, function(data) {
            $localStorage.token = data.token;
            currentUser = UserResource.get();
            return cb(data);
          }, function(err) {
            return cb(err);
          }).$promise;
        },

        /**
         * Set session token
         *
         * @param  {String}   session token
         * @return {Promise}
         */
        setSessionToken: function(sessionToken, callback) {
          var cb = callback || angular.noop;
          $localStorage.token = sessionToken;
          currentUser = UserResource.get(cb);
        }

      };
    });


}());

