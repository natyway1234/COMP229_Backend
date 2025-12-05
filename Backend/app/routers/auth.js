var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth');

// POST signup - create new user
router.post('/signup', authController.signup);

// POST signin - authenticate user
router.post('/signin', authController.signin);

module.exports = router;

