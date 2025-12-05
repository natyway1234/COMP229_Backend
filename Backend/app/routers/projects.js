var express = require('express');
var router = express.Router();

var projectController = require('../controllers/projects');
var authMiddleware = require('../middleware/auth');

// GET all projects (public)
router.get('/', projectController.list);

// GET project by id (public)
router.get('/:id', projectController.getById);

// POST create new project (requires authentication)
router.post('/', authMiddleware.requireAuth, projectController.create);

// PUT update project by id (requires authentication)
router.put('/:id', authMiddleware.requireAuth, projectController.update);

// DELETE all projects (requires authentication)
router.delete('/', authMiddleware.requireAuth, projectController.deleteAll);

// DELETE project by id (requires authentication)
router.delete('/:id', authMiddleware.requireAuth, projectController.delete);

module.exports = router;

