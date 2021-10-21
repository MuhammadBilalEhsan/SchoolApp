const express = require("express");
const user = express.Router();
const userController = require("./userController");

user.route("/signup").post(userController.registerUser);
user.route("/login").post(userController.loginUser);
user.route("/profile").post(userController.profile);

module.exports = user;
