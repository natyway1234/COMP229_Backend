var express = require('express');
var router = express.Router();

var projectController = require('../controllers/projects');
var authMiddleware = require('../middleware/auth');

router.get('/', projectController.list);

router.get('/:id', projectController.getById);

router.post('/', authMiddleware.requireAuth, projectController.create);

router.put('/:id', authMiddleware.requireAuth, projectController.update);

router.delete('/', authMiddleware.requireAuth, projectController.deleteAll);

router.delete('/:id', authMiddleware.requireAuth, projectController.delete);

module.exports = router;

