/**
 * Express configuration
 */

'use strict';
var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var session = require('express-session');
var multer = require('multer');
var RedisStore = require('connect-redis')(session);
//var port = process.env.PORT || 9000;
//var host = process.env.DOMAIN || '127.0.0.1';
//var redis = require("redis");
//var client = redis.createClient(9000,'127.0.0.1');

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(require('prerender-node').set('prerenderToken', config.prerender.Token));
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(multer({dest: './uploads/'})); //just uploading files to server at the moment..

  // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
  //this is express session
  //TODO (optional) use redisStore to keep session presistent non dependent of nodejs process
  app.use(session({
    //store: new RedisStore({
    //  host: host,
    //  port: port,
    //  client:redis
    //}),
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  //this is passport session, must be under express session and under initialize !!
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  //delete password and salt ! never reveal those two.
  passport.deserializeUser(function(user, done) {
    delete user.password;
    delete user.salt;
    done(null, user);
  });

  app.set('appPath', path.join(config.root, 'client'));
  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
