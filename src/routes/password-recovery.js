const express = require("express");
const PasswordController = require("../controller/password-recovery");
const router = express.Router();

// PASSWORD RECOVERY
router.post("/recovery", PasswordController.requestPasswordRecovery);

// RESET PASSWORD
router.post("/reset", PasswordController.resetPassword);

module.exports = router;