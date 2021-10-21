const express = require("express");
const app = express();
const db = require("./database/conn");
const user = require('./modules/user/userRoutes')
const bodyParser = require("body-parser");

require("dotenv").config();
const port = process.env.PORT || 4040;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", user);


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, _ => {
  console.log(`server is working on http://localhost:${port}`);
  db.dbConnector();
});
