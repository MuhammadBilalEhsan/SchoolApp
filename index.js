const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const path = require("path")

const app = express();

const db = require("./database/conn");
const user = require("./modules/user/userRoutes");
const bodyParser = require("body-parser");

const { initializeApp } = require("firebase/app");
const firebaseConfig = require("./firebase/firebaseConfig");
const course = require("./modules/course/courseRoutes");
const assignment = require("./modules/assignment/assignmentRoutes");

require("dotenv").config();
const port = process.env.PORT || 4040;

if (process.env.NODE_ENV == "production") {
	app.use("/*", express.static(path.resolve(path.join(__dirname, "frontend/build"))))
}
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
initializeApp(firebaseConfig);

app.use("/user", user);
app.use("/course", course);
app.use("/assignment", assignment);
// with this line of code we will get all the profile images
app.use(express.static(__dirname + "./public/"));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// setting for socket io
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
	console.log("SocketIO New Connection");

	socket.on("joined", ({ curUser }) => {
		console.log(curUser);
	});

	socket.on("disconnected", () => {
		console.log("User Left");
	});
});

server.listen(port, () => {
	console.log(`server is working on http://localhost:${port}`);
	db.dbConnector();
});
