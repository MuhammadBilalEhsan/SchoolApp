const express = require("express");
const student = express.Router();

const controller = require("./controllers");

student.route("/").get(controller.studentProfile);



student.get("/mark-attendance", (req, res) => {
  res.send("This is Mark Attendance ");
});
student.get("/read-attendance", (req, res) => {
  res.send("This is Student Read Attendance");
});
student.get("/assignments", (req, res) => {
  res.send("This is Student Assignment");
});
student.get("/facality-profiles", (req, res) => {
  res.send("This is Facality Profile for students");
});

module.exports = student;
