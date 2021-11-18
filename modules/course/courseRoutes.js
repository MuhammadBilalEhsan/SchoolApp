const express = require("express");
const course = express.Router();
const courseController = require("./courseController");

course.route("/add").post(courseController.addCourse);
course.route("/mycourse").post(courseController.getMyCourse);
course.route("/delcourse").post(courseController.delCourseController);
// course.route("/").post(userController.registerUser);

module.exports = course;
