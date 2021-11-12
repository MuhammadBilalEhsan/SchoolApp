const User = require("./userModel");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const {
	getStorage,
	ref,
	uploadBytes,
	getMetadata,
} = require("firebase/storage");
const { async } = require("@firebase/util");

// REGISTER USER ROUTE
module.exports.registerUser = async (req, res) => {
	try {
		let { fname, lname, email, password, roll } = req.body;
		let dateOfAddmission = new Date().toString();
		if (!fname || !lname || !email || !password || !roll || !dateOfAddmission) {
			res
				.status(422)
				.json({ error: "You Should write all fields properly..!" });
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

			if (!userUpdate) {
				res.status(400).send({ error: "User not Update" });
			} else {
				res.status(200).send({ message: "User Update Successfully" });
			}
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports.EditProfileImage = async (req, res) => {
	const _id = req.body._id;
	const dp = JSON.parse(req.file);
	try {
		if (dp) {
			const storage = getStorage();

			const storageRef = ref(storage, "profileImg/" + _id);
			const fbs = await uploadBytes(storageRef, req.file.buffer, {
				contentType: req.file.mimetype,
			});
			if (fbs) {
				console.log("successfully uploaded");
			}
			console.log(fbs);
			// console.log(dp);
			// console.log(`${__dirname}/profile-images/${dp.filename}`);
		}
	} catch (err) {
		console.log(err);
	}
	// const dp = req.file ? req.file.filename : null;
	// if (dp) {
	//   const changeDP = await User.findByIdAndUpdate(_id, {
	//     dp,
	//   });
	//   if (!changeDP) {
	//     return res.status(400).send({ error: "Profile Pic not Update" });
	//   } else {
	//     return res
	//       .status(200)
	//       .send({ message: "Profile Pic Update Successfully" });
	//   }
	// }
};

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
module.exports.getAllData = async (req, res) => {
	const allUsers = await User.find({});
	res.status(200).send(allUsers);
};

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
				console.log(markAttWithNewMonth);
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
				console.log(markAttWithExistMonth);
				if (!markAttWithExistMonth) {
					return res
						.status(500)
						.send({ error: "Mark Attendance with Existing Month failed!" });
				}
			}
			return res
				.status(200)
				.send({ message: "Todays attendance have been marked." });
		}
	} catch (err) {
		console.error(err);
	}
};
module.exports.profile = async (req, res) => {
	try {
		const _id = "61708a8defe0fc8e555e618e";
		const userData = await User.findOne({ _id }, (err, user) => {
			if (err) {
				console.log(err);
				res.send({ status: false, error: err });
			}
			res.send({ status: true, userDetails: userData });
		});
	} catch (err) {
		console.log(err);
	}
};
module.exports.classMaterials = async (req, res) => {
	// const id = req.params.id;
	// const id = "61708a8defe0fc8e555e618e";
	// console.log(id);
};
