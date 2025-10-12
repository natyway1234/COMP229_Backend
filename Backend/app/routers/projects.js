var express = require('express');
var router = express.Router();

var projectController = require('../controllers/projects');

// GET all projects
router.get('/', projectController.list);

// GET project by id
router.get('/:id', projectController.getById);

// POST create new project
router.post('/', projectController.create);

// PUT update project by id
router.put('/:id', projectController.update);

// DELETE project by id
router.delete('/:id', projectController.delete);

// DELETE all projects
router.delete('/', projectController.deleteAll);

module.exports = router;

