"use strict";

var creditReport = require("./controllers/creditReport"),
// index = ("./controllers/index"),
//    user = require("./controllers/user"),
//    middleware = require("./middleware"),
    config = require("./config/config"),
    bodyParser = require("body-parser");



// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
//	console.log("Looking for my session cookie in the request: ", req.cookies);
//	console.log("Looking for my session signed cookie in the request: ", req.signedCookies);
//	console.log("Is my request already authenticated: ", req.isAuthenticated());

    return next();
}


/**
 * Application routes
 */
module.exports = function (app) {

//	app.use(ensureAuthenticated);

    // Server API Routes

    // this actually gets the users creditReport
    app.route("/api/creditReport/").
        post(creditReport.getCreditReport);

//    app.route("/api/users/:userid/creditReport")
//        .post(user.getCreditReport);


    // All undefined api routes should return a 404
    app.route("/api/*")
        .get(function (req, res) {
            res.status(404).end();
        });

    // All other routes to use Angular routing in angular/scripts/app.js
//    app.route("/partials/*")
//        .get(index.partials);

//    turn on after we manage user on Node server
//    app.route("/*")
//        .get(middleware.setUserCookie, index.index);
};



