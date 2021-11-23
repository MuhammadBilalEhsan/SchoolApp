const Course = require("./courseModel");
const User = require("../user/userModel");

module.exports.getMyCourse = async (req, res) => {
	try {
		const { teacher_id } = req.body;
		if (!teacher_id) {
			res.status(400).send({ error: "teacher not found" });
		} else {
			const course = await Course.findOne({ teacher_id });
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
		teacherClass,
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
			!teacherClass ||
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
				teacherClass,
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
module.exports.editCourse = async (req, res) => {
	const {
		teacher_id,
		teacherEmail,
		teacherClass,
		courseName,
		courseDesc,
		topics,
		duration,
		courseOutline,
	} = req.body;
	try {
		if (
			!teacher_id ||
			!teacherEmail ||
			!teacherClass ||
			!courseName ||
			!courseDesc ||
			!topics ||
			!duration ||
			!courseOutline
		) {
			res.status(400).send({ error: "You Should fill all fields properly..!" });
		}
		const editCourse = await Course.findOneAndUpdate(teacher_id, {
			teacher_id,
			teacherEmail,
			teacherClass,
			courseName,
			courseDesc,
			topics,
			duration,
			courseOutline
		});
		if (!editCourse) {
			return res.status(512).send({ error: "Course not Updating" })
		} else {
			return res.status(200).send({ message: "Successfully Course Updated" })
		}
	} catch (error) {
		console.log(error);
		res.status(400).send({ error: "Unexpected error..." });
	}
};
module.exports.coursesForStudents = async (req, res) => {
	try {
		const studentClass = Number(req.body.studentClass)
		if (!studentClass) {
			res.status(400).send({ error: "Students Class ??" })
		} else {
			const availaleCourses = await Course.find({ teacherClass: studentClass })
			if (!availaleCourses) {
				res.status(200).send({ message: `No Courses Available for class ${studentClass}` })
			} else {
				res.status(200).send({ courses: availaleCourses, message: `These Courses are Available for class ${studentClass}` })
			}
		}

	} catch (error) {
		console.log(error)
	}
}
module.exports.applyForCourse = async (req, res) => {
	try {
		const { course_id, student_id, student_name } = req.body
		if (!course_id || !student_id || !student_name) {
			return res.status(400).send({ error: "Unautherize Request" })
		} else {

			const findCourse = await Course.findOne({ _id: course_id })
			if (findCourse) {
				const newStudent = { id: student_id, name: student_name }
				const addStudent = await Course.findByIdAndUpdate(course_id, {
					students: [...findCourse.students, newStudent]
				})
				if (addStudent) {
					return res.send({ message: "Student Enrolled" })
				} else {
					return res.status(512).send({ error: "Student can't Enrole." })
				}
			} else {
				return res.status(402).send({ error: "This Course not Exist" })

			}
		}
	} catch (error) {
		console.log(error)
	}
}
