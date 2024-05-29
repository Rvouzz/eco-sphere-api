const express = require("express");
const recyclingController = require("../controller/recycling");

const router = express.Router();

// READ - GET
router.get("/", recyclingController.getAllRecycling);
router.get("/:recyclingId", recyclingController.getRecyclingById);

// CREATE - POST
router.post("/", recyclingController.createNewRecycling);

// UPDATE - PATCH
router.patch("/:recyclingId", recyclingController.updateRecycling);

// DELETE - DELETE
router.delete("/:recyclingId", recyclingController.deleteRecycling);

module.exports = router;