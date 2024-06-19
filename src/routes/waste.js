const express = require("express");
const wasteController = require("../controller/waste");
const processImage = require("../middleware/processImage");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// READ - GET
router.get("/", wasteController.getAllWaste);
router.get("/:wasteId", wasteController.getWasteById);

// CREATE - POST
router.post("/", authenticateToken, processImage, wasteController.createNewWaste);

// UPDATE - PATCH
router.patch("/:wasteId", authenticateToken, processImage, wasteController.updateWaste);

// DELETE - DELETE
router.delete("/:wasteId", authenticateToken, wasteController.deleteWaste);

module.exports = router;