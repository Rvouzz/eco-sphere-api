const express = require("express");
const UserController = require("../controller/user");
const router = express.Router();

// CREATE - POST
router.post("/", UserController.createNewUser);
router.post("/login", UserController.loginUser);

// READ - GET
router.get("/", UserController.getAllUser);
router.get("/:id_user", UserController.getUserById)

module.exports = router;