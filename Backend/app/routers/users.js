var express = require('express');
var router = express.Router();

var userController = require('../controllers/users');
var authMiddleware = require('../middleware/auth');

router.get('/', userController.list);

router.get('/:id', userController.getById);

router.post('/', userController.create);

router.put('/:id', authMiddleware.requireAuth, userController.update);

router.delete('/', authMiddleware.requireAuth, userController.deleteAll);

router.delete('/:id', authMiddleware.requireAuth, userController.delete);

module.exports = router;