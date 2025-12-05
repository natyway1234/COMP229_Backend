var express = require('express');
var router = express.Router();

console.log('Auth router: Loading controller...');
var authController = require('../controllers/auth');
console.log('Auth router: Controller loaded successfully');

// POST sign up
router.post('/signup', (req, res, next) => {
  console.log('Auth router: /signup route hit');
  authController.signup(req, res, next);
});

// POST sign in
router.post('/signin', (req, res, next) => {
  console.log('Auth router: /signin route hit');
  authController.signin(req, res, next);
});

console.log('Auth router: Routes registered - /signup and /signin');

module.exports = router;

