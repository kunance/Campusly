'use strict';

var express = require('express');
var controller = require('./finance.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.newFinance);
router.get('/all', auth.isAuthenticated(), controller.showFinances);
router.get('/:id', auth.isAuthenticated(), controller.getFinance);
router.put('/:id', auth.isAuthenticated(), controller.saveFinance);
router.delete('/:id', auth.isAuthenticated(), controller.deleteFinance);


module.exports = router;
