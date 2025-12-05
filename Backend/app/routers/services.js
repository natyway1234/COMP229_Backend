var express = require('express');
var router = express.Router();

var serviceController = require('../controllers/services');
var authMiddleware = require('../middleware/auth');

router.get('/', serviceController.list);

router.get('/:id', serviceController.getById);

router.post('/', authMiddleware.requireAuth, serviceController.create);

router.put('/:id', authMiddleware.requireAuth, serviceController.update);

router.delete('/', authMiddleware.requireAuth, serviceController.deleteAll);

router.delete('/:id', authMiddleware.requireAuth, serviceController.delete);

module.exports = router;

