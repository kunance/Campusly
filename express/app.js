"use strict";

// catch everything include modules that don't load properly
process.on("uncaughtException", function (err) {
    console.log("Uncaught Exception!!!!!", err);
});


var express = require("express"),
    path = require("path"),
    fs = require("fs"),
    http = require("http"),
    logger =  require("./config/logger");


/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || "development";
var config = require("./config/config");

// Start\Setup server
var app = express();

// simple logger
app.use(function(req, res, next){
    logger.info(req.method, req.url);
    next();
});


require("./config/express")(app);
require("./routes")(app);

// TODO load models as global like app.set("models", models) so they are accessible anywhere
var models = require("./models");


models.RENTED_USER.find(7).then(function(user) {

    console.log(user.dataValues);

}).catch(function(err) {

    console.error(err);

});


// Start server
http.createServer(app).listen(config.port, config.ip, function () {
    console.log("Express server listening on %s:%d, in %s mode", config.ip, config.port, app.get("env"));
});


// Expose app
module.exports = app;