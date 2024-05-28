const express = require('express');
const UserController = require('../controller/user.js');
const router = express.Router();

router.get('/', UserController.getAllUser);

router.post('/', UserController.createNewUser);

module.exports = router;