const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/:name', usersController.findByName);
router.get('/', usersController.getAll);
router.delete('/:name', usersController.deleteByName);
router.post('/upsert', usersController.upsert);

module.exports = router;