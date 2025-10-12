var express = require('express');
var router = express.Router();

var indexController = require('../controllers/index');

router.get('/', indexController.home);
router.get('/hello', indexController.helloWorld);
router.get('/goodbye', indexController.goodbye);

module.exports = router;