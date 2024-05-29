const express = require("express");
const wasteController = require("../controller/waste");

const router = express.Router();

// READ - GET
router.get("/", wasteController.getAllWaste);
router.get("/:wasteId", wasteController.getWasteById);

// CREATE - POST
router.post("/", wasteController.createNewWaste);

// UPDATE - PATCH
router.patch("/:wasteId", wasteController.updateWaste);

// DELETE - DELETE
router.delete("/:wasteId", wasteController.deleteWaste);

module.exports = router;