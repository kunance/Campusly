"use strict";

//var mongoose = require("mongoose"),
//    User = mongoose.model("User");

//
///**
// * Create user
// */
//exports.create = function (req, res, next) {
//    var newUser = new User(req.body);
//    newUser.provider = "local";
//    newUser.save(function (err) {
//        if (err){
//            return res.json(400, err);
//        }
//        req.logIn(newUser, function (err) {
//            if (err){
//                return next(err);
//            }
//            return res.json(req.user.userInfo);
//        });
//    });
//};
//
///**
// *  Get profile of specified user
// */
//exports.show = function (req, res, next) {
//    var userId = req.params.id;
//
//    User.findById(userId, function (err, user) {
//        if (err){
//            return next(err);
//        }
//        if (!user){
//            return res.send(404);
//        }
//        res.send({ profile: user.profile });
//    });
//};
//
//
//
///**
// * get a user's credit report
// */
//exports.getCreditReport = function (req, res, next) {
//    var userid = req.params.userid;
//
//    console.log("getCreditReport ", userid);
//
//    User.findOne({userid:userid}, function (err, user) {
//        if (err){
//            return next(err);
//        }
//        if (!user){
//            return res.send(404);
//        }
//
//        res.send({ report: user.creditReport});
//    });
//};



