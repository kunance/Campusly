'use strict';

var config = require('./config/config');

/**
 * Custom middleware used by the application
 */
module.exports = {

    /**
     * Set a cookie for angular so it knows we have an http session
     */
    setUserCookie: function (req, res, next) {
        if (req.user) {
            res.cookie('user', JSON.stringify(req.user));
        }
        next();
    }
};