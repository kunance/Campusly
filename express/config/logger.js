"use strict";

var winston = require("winston");
var fs = require("fs");
var logDir = __dirname + "/../../logs/";
function getLogger () {

    if(!fs.existsSync(logDir)){
        fs.mkdirSync(logDir, parseInt(777,8), function(err){
            if(err){
                console.log(err);
            }
        });
    }
    return new(winston.Logger)({
        transports: [
            new (winston.transports.File) ({filename: logDir + "rented.log"})
        ],
        exceptionHandlers: [
            new (winston.transports.File) ({filename: logDir + "exceptionRented.log"})
        ],
        exitOnError: false
    });
}

module.exports = getLogger();
