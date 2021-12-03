const express = require("express");
const assignment = express.Router();
const assignmentController = require("./assignmentControllers");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    },
});

var upload = multer({ storage: storage }).any("myFile");

assignment.post("/add", upload, assignmentController.addAssignmentController)

module.exports = assignment;