const express = require('express');
const UserController = require('../controller/user');
const router = express.Router();

  // CREATE - POST
router.post('/', UserController.createNewUser);

router.get('/', UserController.getAllUser);

module.exports = router;