(function (exp) {
  "use strict";

  var knox = require('knox');
  var fs = require('fs');
  var async = require('async');
  var config = require('../../config/environment');
 // var userinfo = require('../user/user.controller');
  // S3 Connector
  var connect = function() {
    return knox.createClient(config.aws_s3);
  };

  // Remove Temp File
  var removeTemp = function(path, callback) {
    fs.unlink(path, function(err) {
      if (typeof callback === 'function') {
        process.nextTick(function() {
          callback(err);
        });
      }
    });
  };

  var client = connect();


  exp.upload = function(localPath, s3Path, cb) {
   // var fale = req.files.file;
    async.waterfall([

      // Upload the file to S3
      function(callback) {
        client.putFile(
          localPath, s3Path,
          function(err, result) {
            if (result.statusCode !== 200) {
              err = new Error('Upload Failure: ' + result.statusCode);
            }
            callback(err);
          }
        );
      },

      // Remove the temp file on local
      function(callback) {
        removeTemp(localPath, function(err) {
          callback(err);
        });
      }
    ],cb);
  };

  exp.download = function(imageId, cb) {
    client.getFile(imageId, function(err, imageStream) {
      cb(err,imageStream);
    });
  }
}(module.exports));
