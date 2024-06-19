const express = require("express");
const contentsController = require("../controller/contents");
const processImage = require("../middleware/processImage");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// READ - GET
router.get("/", contentsController.getAllContents);
router.get("/:contentId", contentsController.getContentById);

// CREATE - POST
router.post("/", authenticateToken, processImage, contentsController.createNewContent);

// UPDATE - PATCH
router.patch("/:contentId", authenticateToken, processImage, contentsController.updateContent);

// DELETE - DELETE
router.delete("/:contentId", authenticateToken, contentsController.deleteContent);

module.exports = router