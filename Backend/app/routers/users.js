var express = require('express');
var router = express.Router();

var userController = require('../controllers/users');

// GET all users
router.get('/', userController.list);

// GET user by id
router.get('/:id', userController.getById);

// POST create new user
router.post('/', userController.create);

// PUT update user by id
router.put('/:id', userController.update);

// DELETE user by id
router.delete('/:id', userController.delete);

// DELETE all users
router.delete('/', userController.deleteAll);

module.exports = router;