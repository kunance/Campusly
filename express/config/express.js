"use strict";

var express = require("express"),
    favicon = require("serve-favicon"),
    morgan = require("morgan"),
    compression = require("compression"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    cookieParser = require("cookie-parser"),
    session = require("express-session"),
    errorHandler = require("errorhandler"),
    path = require("path"),
    config = require("./config");
//    mongoStore = require("connect-mongo")(session),


/**
 * Express configuration
 */
module.exports = function (app) {

    var env = app.get("env");

    console.log("env", env);
    console.log("config.root", config.root);


    if ("development" === env) {

        // Disable caching of scripts for easier testing
        app.use(function noCache(req, res, next) {
            if (req.url.indexOf("/scripts/") === 0) {
                res.header("Cache-Control", "no-cache, no-store, must-revalidate");
                res.header("Pragma", "no-cache");
                res.header("Expires", 0);
            }
            next();
        });


//        app.use(express.static(path.join(config.root, "../angular")));
//        app.set("views", config.root + "../angular/src");
    }


//    if ("production" === env) {
//        app.use(compression());
//        console.log("config.root", config.root);
//        app.use(favicon(path.join(config.root, "public", "favicon.ico")));
//        app.use(express.static(path.join(config.root, "public")));
//        app.set("views", config.root + "/src");
//    }

    app.engine("html", require("ejs").renderFile);
    app.set("view engine", "html");
    app.use(morgan("dev"));
    app.use(methodOverride());

    app.use(cookieParser());

    app.use(bodyParser.raw({limit: "100mb"}));
    app.use(bodyParser.text({limit: "100mb"}));
    app.use(bodyParser.json({limit: "100mb"}));
    app.use(bodyParser.urlencoded({limit: "100mb", extended: true}));

    // Persist sessions with mongoStore
    app.use(session({
        cookie: { secure: false,  maxAge: null },
        secret: "rented secret",
        name: "rented",
        proxy: "true",
        saveUninitialized: true,
        resave: false
//        store: new mongoStore({
//            url: config.mongo.uri,
//            collection: "sessions"
//        })
    }));

    // Error handler - has to be last
    if ("development" === app.get("env")) {
        app.use(errorHandler());

    }
};

