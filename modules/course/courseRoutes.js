const express = require("express");
const course = express.Router();
const courseController = require("./courseController");

course.route("/add").post(courseController.addCourse);
course.route("/mycourse").post(courseController.getMyCourse);
course.route("/editcourse").post(courseController.editCourse);
course.route("/delcourse").post(courseController.delCourseController);
course.route("/forstudent").post(courseController.coursesForStudents);
// course.route("/studentallcourses").post(courseController.studentAllCourses)
course.route("/applynow").post(courseController.applyForCourse);
// course.route("/").post(userController.registerUser);

module.exports = course;
