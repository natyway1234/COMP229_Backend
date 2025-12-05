var express = require('express');
var router = express.Router();

var contactController = require('../controllers/contacts');
var authMiddleware = require('../middleware/auth');

// GET all contacts (public)
router.get('/', contactController.list);

// GET contact by id (public)
router.get('/:id', contactController.getById);

// POST create new contact (requires authentication)
router.post('/', authMiddleware.requireAuth, contactController.create);

// PUT update contact by id (requires authentication)
router.put('/:id', authMiddleware.requireAuth, contactController.update);

// DELETE all contacts (requires authentication)
router.delete('/', authMiddleware.requireAuth, contactController.deleteAll);

// DELETE contact by id (requires authentication)
router.delete('/:id', authMiddleware.requireAuth, contactController.delete);

module.exports = router;

