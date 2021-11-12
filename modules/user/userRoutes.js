const express = require("express");
const user = express.Router();
const userController = require("./userController");

const multer = require("multer");
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/profile-images");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname);
	},
});

var upload = multer({ storage: storage }).single("myImg");

user.route("/register").post(userController.registerUser);
user.route("/login").post(userController.loginUser);
user.route("/profile").post(userController.profile);
user.route("/edit-profile").post(userController.EditProfile);
// user.post("/editprofileimg", userController.EditProfileImage);
user.post("/editprofileimg", upload, userController.EditProfileImage);
user.route("/getdata").get(userController.getAllData);
user.route("/attendance").post(userController.markAttendance);
user.route("/claass_materials").post(userController.classMaterials);

module.exports = user;
