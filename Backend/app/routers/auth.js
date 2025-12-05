var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth');

router.post('/signup', authController.signup);

router.post('/signin', authController.signin);

module.exports = router;

