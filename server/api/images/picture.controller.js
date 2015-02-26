(function (exp) {
  "use strict";

  var knox = require('knox');
  var fs = require('fs');
  var async = require('async');
  var config = require('../../config/environment');
  var userinfo = require('../user/user.controller');
  //var s3 = require('../../components/aws-s3/index');
  //var sqldb = require('../../sqldb');
  //var propertyImages = sqldb.model('propertyImages');

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
    var item = req.files.file;
    var localPath = item.path;
    var s3Path = '/'+ item.name;
    s3.upload(localPath, s3Path, function(err) {
      if (err)
        return res.send(500, 'upload failure');
     // newPropertyImages= propertyImages.build()
    });

  };

  exp.download = function(req,res) {
    var id = req.params.id;
    client.getFile('/' + id, function(err, imageStream) {
      imageStream.pipe(res);
    });
  }
}(module.exports));
