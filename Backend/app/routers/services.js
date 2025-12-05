var express = require('express');
var router = express.Router();

var serviceController = require('../controllers/services');
var authMiddleware = require('../middleware/auth');

// GET all services (public)
router.get('/', serviceController.list);

// GET service by id (public)
router.get('/:id', serviceController.getById);

// POST create new service (requires authentication)
router.post('/', authMiddleware.requireAuth, serviceController.create);

// PUT update service by id (requires authentication)
router.put('/:id', authMiddleware.requireAuth, serviceController.update);

// DELETE all services (requires authentication)
router.delete('/', authMiddleware.requireAuth, serviceController.deleteAll);

// DELETE service by id (requires authentication)
router.delete('/:id', authMiddleware.requireAuth, serviceController.delete);

module.exports = router;

