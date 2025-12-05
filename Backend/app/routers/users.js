var express = require('express');
var router = express.Router();

var userController = require('../controllers/users');
var authMiddleware = require('../middleware/auth');

// GET all users (public)
router.get('/', userController.list);

// GET user by id (public)
router.get('/:id', userController.getById);

// POST create new user (public - for signup)
router.post('/', userController.create);

// PUT update user by id (requires authentication)
router.put('/:id', authMiddleware.requireAuth, userController.update);

// DELETE all users (requires authentication)
router.delete('/', authMiddleware.requireAuth, userController.deleteAll);

// DELETE user by id (requires authentication)
router.delete('/:id', authMiddleware.requireAuth, userController.delete);

module.exports = router;