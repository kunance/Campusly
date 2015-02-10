(function (exp) {
  "use strict";

  var knox = require('knox');
  var fs = require('fs');
  var async = require('async');
  var config = require('../../config/environment');
  var userinfo = require('../user/user.controller');
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

  exp.upload = function(req,res) {
    var item = req.files.file,
      localPath = item.path,
      s3Path = '/' + item.name;
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
    ], function(err) {
      if (err) {
        res.send(500, 'upload failure');
      } else {
        res.json({ saved: s3Path });
      }
    });
  };

  exp.download = function(req,res) {
    var id = req.params.id;
    client.getFile('/' + id, function(err, imageStream) {
      imageStream.pipe(res);
    });
  }
}(module.exports));
