var express = require('express');
var router = express.Router();

var contactController = require('../controllers/contacts');
var authMiddleware = require('../middleware/auth');

router.get('/', contactController.list);

router.get('/:id', contactController.getById);

router.post('/', authMiddleware.requireAuth, contactController.create);

router.put('/:id', authMiddleware.requireAuth, contactController.update);

router.delete('/', authMiddleware.requireAuth, contactController.deleteAll);

router.delete('/:id', authMiddleware.requireAuth, contactController.delete);

module.exports = router;

