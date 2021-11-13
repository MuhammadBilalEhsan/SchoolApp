const express = require("express");
const course = express.Router();
const courseController = require("./courseController");

course.route("/").get(courseController.getSlash);
course.route("/add").post(courseController.addCourse);
// course.route("/").post(userController.registerUser);

module.exports = course;
