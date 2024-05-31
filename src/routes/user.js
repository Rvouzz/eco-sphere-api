const express = require("express");
const UserController = require("../controller/user");
const router = express.Router();

// CREATE - POST
router.post("/", UserController.createNewUser);
router.post("/login", UserController.loginUser);

// READ - GET
router.get("/", UserController.getAllUser);
router.get("/:id_user", UserController.getUserById)

// UPDATE - PATCH
router.patch("/:id_user", UserController.updateUserById)
router.patch("/:id_user/role", UserController.updateRoleById);

// DELETE - DELETE
router.delete("/:id_user", UserController.deleteUserById)

// PASSWORD RECOVERY
router.post("/password-recovery", UserController.requestPasswordRecovery);
router.post("/reset-password", UserController.resetPassword);

module.exports = router;