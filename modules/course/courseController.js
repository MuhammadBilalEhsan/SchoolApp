const Course = require("./courseModel");
const User = require("../user/userModel");

module.exports.getSlash = (req, res) => {
	res.send("<h1>Bilal Ehsan is here for course details</h1>");
};
module.exports.addCourse = async (req, res) => {
	const {
		teacherName,
		teacher_id,
		courseName,
		courseDesc,
		topics,
		duration,
		dateOfCreation,
	} = req.body;
	try {
		const findTeacher = await User.findOne({ _id: teacher_id });
		if (!findTeacher) {
			res.status(400).send({ error: "You send a Bad Request" });
		}
		if (
			!teacherName ||
			!teacher_id ||
			!courseName ||
			!courseDesc ||
			!topics ||
			!duration ||
			!dateOfCreation
		) {
			res.status(400).send({ error: "You Should fill all fields properly..!" });
		}
		const secondCourse = await Course.findOne({ teacher_id });
		if (!secondCourse) {
			const course = new Course({
				teacherName,
				teacher_id,
				courseName,
				courseDesc,
				topics,
				duration,
				dateOfCreation,
			});
			const courseSave = await course.save();
			if (courseSave) {
				res.status(200).send({ message: "Course added Successfully" });
			}
		}
		res.status(400).send({
			error: "A Teacher can create only one Course..",
		});
	} catch (error) {
		console.log(error);
		res.status(400).send({ error: "Unexpected error..." });
	}
};
