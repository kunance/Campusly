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

        // Disable caching of scripts for easier testing .... need to square away where the scripts live since
        // they are spread out under src/app everywhere !!
        //app.use(function noCache(req, res, next) {
        //    if (req.url.indexOf("/scripts/") === 0) {
        //        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        //        res.header("Pragma", "no-cache");
        //        res.header("Expires", 0);
        //    }
        //    next();
        //});


        app.use(favicon(path.join(config.root, "angular/src/assets/img", "favicon.ico")));
        console.log("Serving up static content from: ", path.join(config.root, "angular/build"), " because the grunt build and src directory need to be fixed!!!!" );
        app.use(express.static(path.join(config.root, "angular/build")));
        app.set("views", config.root + "/angular/build/src");

        app.route("/").get(function(req, res) {
            console.log("Serving up file: ", path.join(config.root, "angular/build/index.html"));
            res.render(path.join(config.root, "angular/build/index.html"));
        });
    }


    if ("production" === env) {
        app.use(compression());
        app.use(favicon(path.join(config.root, "dist/assets/img", "favicon.ico")));
        app.use(express.static(path.join(config.root, "dist")));
        //TODO look at removing this since there really should be no need for this
        app.set("views", config.root + "/build/src");

        app.route("/").get(function(req, res) {
            res.render(path.join(config.root, "angular/dist/index.html"));
        });
    }

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