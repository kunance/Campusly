'use strict';

var express = require('express');
var controller = require('./picture.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', /*auth.isAuthenticated(),*/ controller.upload);
router.get('/:id', /*auth.isAuthenticated(),*/ controller.download);

module.exports = router;
