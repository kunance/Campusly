"use strict";

var experianCtrl = require("./controllers/experianCtrl"),
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

    // get credit report based on the information given by the requestor
    app.route("/api/experian/report").
        post(experianCtrl.getCreditReport);

    app.route("/api/experian/user").
        post(experianCtrl.authAndCreateUser);

    app.route("/api/experian/user/answers").
        post(experianCtrl.submitAuthenticateAnswers);

    // Are you currently authorized
    app.route("/api/experian/auth/authstatus/:userToken").
        get(experianCtrl.getAuthStatus);

    // Reauthorized an expired token by getting some identity questions
    app.route("/api/experian/auth/:userToken").
        get(experianCtrl.reAuthExistingToken);

    // Reauthorized an expired token by submitting answers to some identity questions
    app.route("/api/experian/auth/:userToken").
        post(experianCtrl.submitAnswersReauthExistingToken);

    // get credit report for authorized user
    app.route("/api/experian/user/report").
        post(experianCtrl.getConsumerCreditReport);

    //
    app.route("/api/experian/shareReport").
        post(experianCtrl.shareConsumerCreditReport);

    app.route("/api/experian/share/getReport").
        post(experianCtrl.retrieveSharedConsumerCreditReportForEndUser);


    app.route("/api/experian/report/archive").
        post(experianCtrl.retrieveArchivedConsumersReport);




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
