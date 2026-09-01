const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/index");
const routes = require(".");

router.get("/", StudentController.getAllStudents);
router.get("/:id", StudentController.getSingleStudent);
router.post("/", StudentController.createStudent);

module.exports = router;
