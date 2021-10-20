const express = require("express");
const app = express();
const db = require("./database/conn");
const controller = require("./indexController");

const teacher = require("./api/teachers/index");
const student = require("./api/students/index");
const bodyParser = require("body-parser");

require("dotenv").config();
const port = process.env.PORT || 4040;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/teacher", teacher);
app.use("/student", student);

app.route("/register").post(controller.registerUser);
app.route("/login").post(controller.loginUser);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, _ => {
  console.log(`server is working on http://localhost:${port}`);
  db.dbConnector();
});
