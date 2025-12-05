var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth');

// POST sign up
router.post('/signup', authController.signup);

// POST sign in
router.post('/signin', authController.signin);

module.exports = router;

