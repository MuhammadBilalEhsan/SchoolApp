const express = require("express");
const user = express.Router();
const userController = require("./userController");

user.route("/signup").post(userController.registerUser);
user.route("/login").post(userController.loginUser);
user.route("/getdata").get(userController.getAllData);
user.route("/profile").post(userController.profile);
user.route("/claass_materials").post(userController.classMaterials);

module.exports = user;
