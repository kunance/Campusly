(function (angular) {
    angular.module('module.routeSecurity', [])
        .run(['$injector', '$location', '$rootScope', 'loginRedirectPath', function ($injector, $location, $rootScope, loginRedirectPath) {
            if ($injector.has('$route')) {
                new RouteSecurityManager($location, $rootScope, $injector.get('$route'), loginRedirectPath);
            }
        }]);

    function RouteSecurityManager($location, $rootScope, $route, path) {
        this._route = $route;
        this._location = $location;
        this._rootScope = $rootScope;
        this._loginPath = path;
        this._redirectTo = null;
        this._authenticated = !!($rootScope.auth && $rootScope.auth.user);
        this._init();
    }

    RouteSecurityManager.prototype = {
        _init: function () {
            var self = this;
            this._checkCurrent();

            // Set up a handler for all future route changes, so we can check
            // if authentication is required.
            self._rootScope.$on("$routeChangeStart", function (e, next) {
                self._authRequiredRedirect(next, self._loginPath);
            });

            self._rootScope.$on('$firebaseSimpleLogin:login', angular.bind(this, this._login));
            self._rootScope.$on('$firebaseSimpleLogin:logout', angular.bind(this, this._logout));
            self._rootScope.$on('$firebaseSimpleLogin:error', angular.bind(this, this._error));
        },

        _checkCurrent: function () {
            // Check if the current page requires authentication.
            if (this._route.current) {
                this._authRequiredRedirect(this._route.current, this._loginPath);
            }
        },

        _login: function () {

            var that= this;

            that._rootScope.profile.$loaded(function ()
            {
                that._authenticated = true;

                if (that._redirectTo) {
                    that._redirect(that._redirectTo);
                    that._redirectTo = null;
                }
                else if (_.contains(['/register', that._loginPath],that._location.path())) {
                    that._location.replace();
                    that._location.path('/');
                }
            },
            function (err) {
                  throw err;
            });
        },

        _logout: function () {
            this._authenticated = false;

            if (this._location.path()=='/logout')
              this._redirect('/');
            else
              this._checkCurrent();
        },

        _error: function () {
            if (!this._rootScope.auth || !this._rootScope.auth.user) {
                this._authenticated = false;
            }
            this._checkCurrent();
        },

        _redirect: function (path) {
            this._location.replace();
            this._location.path(path);
        },

        // A function to check whether the current path requires authentication,
        // and if so, whether a redirect to a login page is needed.
        _authRequiredRedirect: function (route, path) {

            if (route.authRequired && !this._authenticated) {
                if (route.pathTo === undefined) {
                    this._redirectTo = this._location.path();
                } else {
                    this._redirectTo = route.pathTo === path ? "/" : route.pathTo;
                }
                this._redirect(route.authRequired===true ? path : route.authRequired);
            }
            else if (this._authenticated && this._location.path() === this._loginPath) {
                this._redirect('/');
            }
            else if (this._authenticated && typeof route.profileRequired=='function') {

                var that= this,
                    resolve= function (profile)
                    {
                        var redirect= route.profileRequired(profile);

                        console.log('profileRequired',redirect);

                        if (redirect)
                          that._redirect(redirect);
                    };

                 if (!this._rootScope.profile)
                   resolve(null);
                 else
                   this._rootScope.profile.$loaded(resolve, function (err) {
                      throw err;
                   });
            }
        }
    };
})(angular);
