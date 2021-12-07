const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const path = require("path")
// const jwt = require('jsonwebtoken');
// const User = require("./modules/user/userModel")
// const bcrypt = require("bcryptjs");

const app = express();

const db = require("./database/conn");
const user = require("./modules/user/userRoutes");
const bodyParser = require("body-parser");

// const { initializeApp } = require("firebase/app");
// const firebaseConfig = require("./firebase/firebaseConfig");
const course = require("./modules/course/courseRoutes");
const assignment = require("./modules/assignment/assignmentRoutes");


require("dotenv").config();
const port = process.env.PORT || 4040;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.use(express.static(path.join(__dirname, "frontend/build")))


// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname + "/frontend/build/index.html"))
// })
// if (process.env.NODE_ENV == "production") {
// }
// initializeApp(firebaseConfig);
app.use(express.static(__dirname + "./public/"));

app.use("/user", user);
app.use("/course", course);
app.use("/assignment", assignment);
// with this line of code we will get all the profile images

// setting for socket io

let server = app.listen(port, () => {
	console.log(`server is working on http://localhost:${port}`);
	db.dbConnector();
});


// server.listen(port, () => {
// 	console.log(`server is working on http://localhost:${port}`);
// 	db.dbConnector();
// });

// const server = http.createServer(app);
// const io = socketIO(server);

// io.on("connection", (socket) => {
// 	console.log("SocketIO New Connection");

// 	socket.on("disconnected", () => {
// 		console.log("User Left");
// 	});
// });


let socket = require('socket.io')(server);
socket.on('connection', (socket) => {
	console.log('Client Connected ...!')

	socket.on('newUserCreated', (user) => {
		socket.broadcast.emit('newUserAdded', user)
	})
	// socket.on('userDeleted', (uid) => {
	// 	socket.broadcast.emit('userDeletedNotifyToUser', uid)
	// })
	// socket.on('newParkingAreaAdded', (newParking) => {
	// 	socket.broadcast.emit('newParkingArea', newParking)
	// })
	// socket.on('parkingAreaRemoved', (removedParkingAreaDet) => {
	// 	socket.broadcast.emit('parkingAreaRemovedByAdmin', removedParkingAreaDet)
	// })
	// socket.on('add-new-booking', newBooking => {
	// 	socket.broadcast.emit('new-booking-added', newBooking)
	// })
	// socket.on('upcomingBookingDeleted', (bookingID) => {
	// 	socket.broadcast.emit('bookingDeleted', bookingID)
	// })
})



// module.exports.io = io
