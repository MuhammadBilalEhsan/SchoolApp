const User = require("./userModel");
const bcrypt = require("bcryptjs");
const admin = require("firebase-admin");
// const jwt = require("jsonwebtoken")
const serviceAccount = require("../../firebase/serviceAccount")
const fs = require("fs")


admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://schoolapp-4ee60-default-rtdb.europe-west1.firebasedatabase.app/"
	// databaseURL: process.env.FIREBASEURL
});
const bucket = admin.storage().bucket("gs://schoolapp-4ee60.appspot.com/");
// const bucket = admin.storage().bucket(process.env.BUCKET);

// REGISTER USER ROUTE
module.exports.registerUser = async (req, res) => {
	try {
		let { fname, lname, email, password, roll } = req.body;
		let dateOfAddmission = new Date().toString();
		if (!fname || !lname || !email || !password || !roll || !dateOfAddmission) {
			res
				.status(422)
				.json({ error: "You Should fill all fields properly..!" });
		}
		const usertExist = await User.findOne({ email }).exec();
		if (usertExist) {
			return res.status(422).json({ error: "User already exists" });
		} else {
			const user = new User({
				fname,
				lname,
				email,
				password,
				roll,
				dateOfAddmission,
			});

			const userSave = await user.save();
			if (userSave) {
				return res
					.status(200)
					.json({ message: "User Registered successfully" });
			} else {
				return res.status(500).json({ message: "User can not registered" });
			}
		}
	} catch (err) {
		console.log(err);
	}
};

// EDIT PROFILE ROUTE
module.exports.EditProfile = async (req, res) => {
	try {
		let { id, fname, lname, fatherName, atClass, age, phone } = req.body;

		if (!id || !fname || !lname || !fatherName || !atClass || !age || !phone) {
			return res.status(422).json({ error: "please fill all fields properly" });
		} else {
			const userUpdate = await User.findByIdAndUpdate(id, {
				fname,
				lname,
				fatherName,
				atClass,
				age,
				phone,
			});

			if (userUpdate) {
				const updated = await User.findById(id)
				res.status(200).send({ message: "User Update Successfully", updated });
			} else {
				res.status(400).send({ error: "User not Update" });
			}
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports.EditProfileImage = async (req, res) => {
	// try {
	const _id = req.body._id;
	const dp = req.file;
	if (!_id || !dp) {
		res.status(400).send({ error: "Invalid Credentials!" })
	}
	bucket.upload(dp.path,
		// function (err, file, apiResponse) {
		function (err, file) {
			if (!err) {
				file.getSignedUrl({
					action: 'read',
					expires: '03-09-2491'
				}).then(async (urlData, err) => {
					try {
						if (!err) {
							// console.log("public downloadable url: ", urlData[0])
							const pubURL = urlData[0]
							const pPic = await User.findByIdAndUpdate(_id, {
								dp: pubURL
							})
							fs.unlinkSync(dp.path)
							if (pPic) {
								res.send({ message: "Profile Picture will be updated in a few moments.", pPic: pubURL })
							} else {
								res.status(512).send({ error: "Profile Picture Not Updated" })
							}
						}
					} catch (error) {
						console.log(error)
					}
				})
			}
		}
	)
}

// USER LOGIN ROUTE
module.exports.loginUser = async (req, res) => {
	try {
		let token;
		let { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: "Please fill all fields properly" });
		} else {
			const userExist = await User.findOne({ email }).exec();
			if (userExist) {
				const isMatch = await bcrypt.compare(password, userExist.password);
				token = await userExist.generateAuthToken();
				res.cookie("jwtoken", token, {
					httpOnly: true,
				});


				if (!isMatch) {
					return res.status(401).json({ error: "Invalid Credentials" });
				} else {
					return res
						.status(200)
						.send({ curUser: userExist, message: "User Login successfully" });
				}
			} else {
				return res.status(401).json({ error: "User not exist" });
			}
		}
	} catch (err) {
		console.log(err);
	}
};

// GETTING ALL DATA ROUTE

module.exports.markAttendance = async (req, res) => {
	try {
		const attObj = req.body;
		const { _id, year, month, date, time } = attObj;
		if (!_id || !year || !month || !date || !time) {
			return res.status(400).send({ error: "Invalid Request" });
		}
		const findUser = await User.findOne({ _id });
		const mm_yy = `${month}_${year}`;
		if (!findUser) {
			return res.status(400).send({ error: "User not found" });
		} else {
			const getMonth = findUser.attendance.find(
				(cur) => cur.monthName === mm_yy,
			);
			if (!getMonth) {
				const markAttWithNewMonth = await User.findByIdAndUpdate(_id, {
					attendance: [
						...findUser.attendance,
						{ monthName: mm_yy, days: [{ todayDate: date, time }] },
					],
				});
				if (!markAttWithNewMonth) {
					return res
						.status(500)
						.send({ error: "Mark Attendance with new Month failed!" });
				}
			} else {
				const getMonthIndexNo = findUser.attendance.findIndex(
					(cur) => cur.monthName === mm_yy,
				);
				const newAtt = [...findUser.attendance];
				newAtt[`${getMonthIndexNo}`].days.push({
					todayDate: date,
					time,
				});
				const markAttWithExistMonth = await User.findByIdAndUpdate(_id, {
					attendance: newAtt,
				});
				if (!markAttWithExistMonth) {
					return res
						.status(500)
						.send({ error: "Mark Attendance with Existing Month failed!" });
				}
			}
			const updated = await User.findById(_id)
			return res
				.status(200)
				.send({ message: "Todays attendance have been marked.", updated });
		}
	} catch (err) {
		console.error(err);
	}
};
// module.exports.profile = async (req, res) => {
// 	try {
// 		const _id = "61708a8defe0fc8e555e618e";
// 		const userData = await User.findOne({ _id }, (err, user) => {
// 			if (err) {
// 				console.log(err);
// 				res.send({ status: false, error: err });
// 			}
// 			res.send({ status: true, userDetails: userData });
// 		});
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

module.exports.getData = async (req, res) => {
	const allUsers = await User.find({});
	res.status(200).send(allUsers);
};

module.exports.sendMessageController = async (req, res) => {
	try {
		const { senderID, name, time, message, recieverID } = req.body
		if (!senderID || !name || !time || !message || !recieverID) {
			res.status(400).send({ error: "Invalid Request" })

		} else {
			const findReciever = await User.findById(recieverID)
			if (findReciever) {
				const updateMessages = await User.findByIdAndUpdate(recieverID, {
					messages: [...findReciever.messages, { senderID, name, time, message }]
				})
				if (updateMessages) {
					res.send({ message: "Message Sent" })
				} else {
					res.status(504).send({ error: "Message not Send" })
				}
			} else {
				res.status(404).send({ error: "Not Found..." })
			}
		}
	} catch (error) {
		console.log(error)
	}
}
// module.exports.logOutController = (req, res) => {
// 	res.clearCookie('jwtoken')
// 	res.send("clear")
// }