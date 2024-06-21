const express = require("express");
const UserController = require("../controller/user");
const processImage = require("../middleware/processImage");
const authenticateToken = require("../middleware/auth");
const router = express.Router();

// CREATE - POST
router.post("/", UserController.createNewUser);
router.post("/login", UserController.loginUser);

// READ - GET
router.get("/", UserController.getAllUser);
router.get("/:id_user", UserController.getUserById)
router.get("/email", UserController.getUserByEmail)

// UPDATE - PATCH
router.patch("/:id_user", authenticateToken, processImage, UserController.updateUserById)
router.patch("/:id_user/role", authenticateToken, UserController.updateRoleById);

// DELETE - DELETE
router.delete("/:id_user", authenticateToken, UserController.deleteUserById)

module.exports = router;