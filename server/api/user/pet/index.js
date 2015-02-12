'use strict';

var express = require('express');
var controller = require('./pet.controller');
var auth = require('../../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.newPet);
router.get('/all', auth.isAuthenticated(), controller.showPets);
router.get('/:id', auth.isAuthenticated(), controller.getPet);
router.put('/:id', auth.isAuthenticated(), controller.savePet);
router.delete('/:id', auth.isAuthenticated(), controller.deletePet);

module.exports = router;

