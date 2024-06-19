const express = require("express");
const recyclingController = require("../controller/recycling");
const processImage = require("../middleware/processImage");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// READ - GET
router.get("/", recyclingController.getAllRecycling);
router.get("/:recyclingId", recyclingController.getRecyclingById);

// CREATE - POST
router.post("/", authenticateToken, processImage, recyclingController.createNewRecycling);

// UPDATE - PATCH
router.patch("/:recyclingId", authenticateToken, processImage, recyclingController.updateRecycling);

// DELETE - DELETE
router.delete("/:recyclingId", authenticateToken, recyclingController.deleteRecycling);

module.exports = router;