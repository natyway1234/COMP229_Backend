var express = require('express');
var router = express.Router();

var contactController = require('../controllers/contacts');

// GET all contacts
router.get('/', contactController.list);

// GET contact by id
router.get('/:id', contactController.getById);

// POST create new contact
router.post('/', contactController.create);

// PUT update contact by id
router.put('/:id', contactController.update);

// DELETE all contacts (must come before DELETE /:id)
router.delete('/', contactController.deleteAll);

// DELETE contact by id
router.delete('/:id', contactController.delete);

module.exports = router;

