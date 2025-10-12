var express = require('express');
var router = express.Router();

var serviceController = require('../controllers/services');

// GET all services
router.get('/', serviceController.list);

// GET service by id
router.get('/:id', serviceController.getById);

// POST create new service
router.post('/', serviceController.create);

// PUT update service by id
router.put('/:id', serviceController.update);

// DELETE service by id
router.delete('/:id', serviceController.delete);

// DELETE all services
router.delete('/', serviceController.deleteAll);

module.exports = router;

