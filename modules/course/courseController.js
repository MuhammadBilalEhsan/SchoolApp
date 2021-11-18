const Course = require("./courseModel");
const User = require("../user/userModel");

module.exports.getMyCourse = async (req, res) => {
	try {
		const { teacher_id } = req.body;
		if (!teacher_id) {
			res.status(400).send({ error: "teacher not found" });
		} else {
			const course = await Course.findOne({ teacher_id });
			console.log(course);
			res.status(200).send({ course });
		}
	} catch (err) {
		res.status(500).send({ error: "server error" });
	}
};
module.exports.delCourseController = async (req, res) => {
	try {
		const { teacher_id } = req.body;
		if (!teacher_id) {
			res.status(400).send({ error: "Bad Request" });
		} else {
			const delCourse = await Course.findOneAndDelete({ teacher_id });
			if (!delCourse) {
				res.status(400).send({ error: "Not Delete" });
			} else {
				res.status(200).send({ message: "Course Deleted" });
			}
		}
	} catch (err) {
		res.status(500).send({ error: "server error" });
	}
};
module.exports.addCourse = async (req, res) => {
	const {
		teacher_id,
		teacherEmail,
		courseName,
		courseDesc,
		topics,
		duration,
		courseOutline,
	} = req.body;
	const dateOfCreation = new Date().toString();
	try {
		if (
			!teacher_id ||
			!teacherEmail ||
			!courseName ||
			!courseDesc ||
			!topics ||
			!duration ||
			!courseOutline ||
			!dateOfCreation
		) {
			res.status(400).send({ error: "You Should fill all fields properly..!" });
		}
		const secondCourse = await Course.findOne({ teacher_id });
		if (!secondCourse) {
			const course = new Course({
				teacher_id,
				teacherEmail,
				courseName,
				courseDesc,
				topics,
				duration,
				courseOutline,
				dateOfCreation,
			});
			const courseSave = await course.save();
			if (courseSave) {
				res.status(200).send({ message: "Course added Successfully" });
			}
		} else {
			res.send({
				error: "A Teacher can create only one Course..",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(400).send({ error: "Unexpected error..." });
	}
};
