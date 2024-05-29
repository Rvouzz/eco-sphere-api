const express = require("express");
const contentsController = require("../controller/contents");

const router = express.Router();

// READ - GET
router.get("/", contentsController.getAllContents);
router.get("/:contentId", contentsController.getContentById);

// CREATE - POST
router.post("/", contentsController.createNewContent);

// UPDATE - PATCH
router.patch("/:contentId", contentsController.updateContent);

// DELETE - DELETE
router.delete("/:contentId", contentsController.deleteContent);

module.exports = router