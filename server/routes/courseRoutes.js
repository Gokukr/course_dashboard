const express = require("express");
const {
  addCourse,
  assignCourseToTrainer,
} = require("../controllers/courseController");

const router = express.Router();

// Route to add a course
router.post("/add", addCourse);

// Route to assign a course to a trainer
// router.post("/assignCourse", assignCourseToTrainer);

module.exports = router;
