const express = require("express");
const UserController = require("../controller/user");
const router = express.Router();

// CREATE - POST
router.post("/", UserController.createNewUser);

// READ - GET
router.get("/", UserController.getAllUser);

// UPDATE - PATCH
router.patch("/:idUser", UserController.updateUser);

// DELETE - DELETE
router.delete("/:idUser", UserController.deleteUser)

module.exports = router;
