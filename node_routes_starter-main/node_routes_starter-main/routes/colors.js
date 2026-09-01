const express = require("express");
const router = express.Router();

const ColorController = require("../controllers/color");

router.get("/", ColorController.getAllColors);
router.get("/:id", ColorController.getSingleColor);
router.post("/", ColorController.createColor);
router.patch("/:id", ColorController.updateColor);
router.delete("/:id", ColorController.deleteColor);

module.exports = router;
