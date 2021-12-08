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
// module.exports.delCourseController = async (req, res) => {
// 	try {
// 		const { teacher_id } = req.body;
// 		if (!teacher_id) {
// 			res.status(400).send({ error: "Bad Request" });
// 		} else {
// 			const delCourse = await Course.findOneAndDelete({ teacher_id });
// 			if (!delCourse) {
// 				res.status(400).send({ error: "Not Delete" });
// 			} else {
// 				res.status(200).send({ message: "Course Deleted" });
// 			}
// 		}
// 	} catch (err) {
// 		res.status(500).send({ error: "server error" });
// 	}
// };
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
				// const newCourse = await Course.findOne({ teacher_id });
				res.status(200).send({ message: "Course added Successfully", newCourse });
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
			const editted = await Course.findOne({ teacher_id });
			if (editted) {
				res.status(200).send({ message: "Successfully Course Updated", editted })
			}
		}
	} catch (error) {
		console.log(error);
		res.status(400).send({ error: "Unexpected error..." });
	}
};
module.exports.coursesForStudents = async (req, res) => {
	try {
		const { studentID } = req.body
		const studentClass = Number(req.body.studentClass)
		if (!studentClass) {
			res.status(400).send({ error: "Students Class ??" })
		} else {
			const allAvailales = await Course.find({ teacherClass: studentClass })
			const filtered = allAvailales.filter(currentCourse => {
				if (currentCourse.students.length) {
					const abc = currentCourse.students.find((student) => student.id === studentID)
					if (!abc) {
						return currentCourse
					}
				} else {
					return currentCourse
				}
			})
			if (!filtered) {
				res.status(200).send({ message: `No Courses Available for class ${studentClass}` })
			} else {
				res.status(200).send({ courses: filtered, message: `These Courses are Available for class ${studentClass}` })
			}
		}

	} catch (error) {
		console.log(error)
	}
}

// module.exports.studentAllCourses = async (req, res) => {

// }

module.exports.applyForCourse = async (req, res) => {
	try {
		const { course_id, student_id, student_name, courseName } = req.body
		if (!course_id || !student_id || !student_name || !courseName) {
			return res.status(400).send({ error: "Unautherize Request" })
		} else {
			const findCourse = await Course.findOne({ _id: course_id })
			if (!findCourse) {
				return res.status(402).send({ error: "This Course not Exist" })
			} else {
				const studentInCourse = findCourse.students.find(curObj => curObj.id === student_id)
				const findStudent = await User.findOne({ _id: student_id })
				const courseInStudent = findStudent.courses.find(curID => curID === course_id)
				if (studentInCourse || courseInStudent) {
					return res.status(401).send({ error: "Student already enrolled.." })
				} else {
					const addCourseObjInStudent = await User.findOneAndUpdate({ _id: student_id }, {
						courses: [...findStudent.courses, { id: course_id, name: courseName, removedByTeacher: false }]
					})
					const addStudentInCourse = await Course.findByIdAndUpdate(course_id, {
						students: [...findCourse.students, { id: student_id, name: student_name, muted: false }]
					})
					if (addStudentInCourse && addCourseObjInStudent) {
						return res.send({ message: "Student Enrolled" })
					} else {
						return res.status(512).send({ error: "Student can't Enrole." })
					}
				}
			}
		}
	} catch (error) {
		console.log(error)
	}
}
module.exports.getOneCourse = async (req, res) => {
	try {
		const { id } = req.body
		if (!id) {
			res.status(402).send({ error: "Invalid Request" })
		}
		const getCourse = await Course.findById(id)
		if (!getCourse) {
			res.status(422).send({ error: "Course Not Found" })
		} else {

			res.send({ DBcourse: getCourse, message: "this course is available on this id." })
		}

	} catch (error) {
		console.log(error)
	}
}
// module.exports.delEnrolledCourse = async (req, res) => {
// 	try {
// 		const { student_id, course_id } = req.body
// 		if (!student_id || !course_id) {
// 			res.status(401).send({ error: "Invalid Credentials..." })
// 		} else {
// 			const findCourse = await Course.findOne({ _id: course_id })
// 			const delStuFromCor = findCourse.students.filter(item => item.id !== student_id)
// 			const updateCourse = await Course.findByIdAndUpdate({ _id: course_id }, {
// 				students: delStuFromCor
// 			})
// 			const findStudent = await User.findById(student_id)
// 			const delCorFromStud = findStudent.courses.filter(item => item.id !== course_id)
// 			const updateStudent = await User.findOneAndUpdate({ _id: student_id }, {
// 				courses: delCorFromStud
// 			})
// 			if (updateCourse && updateStudent) {
// 				console.log("updateCourse && updateStudent Successfully")
// 				res.send({ message: "You Left from this course..." })
// 			} else {
// 				console.log("Successfull")
// 				res.status(502).send({ error: "An Error Occured..." })
// 			}
// 		}

// 	} catch (error) {
// 		console.log(error)

// 	}
// }
module.exports.getSpecificCourse = async (req, res) => {
	try {
		if (!req.body.id) {
			res.status(400).send({ error: "Invalid Request..." })
		} else {
			const findCourse = await Course.findById({ _id: req.body.id })
			if (!findCourse) {
				res.status(404).send({ error: "Course not found..." })
			} else {
				res.send({ currentCourse: findCourse })
			}
		}
	} catch (error) {
		console.log(error)
	}
}
module.exports.sendMessageController = async (req, res) => {
	try {
		const { id, name, time, message, courseID } = req.body
		if (!id || !name || !time || !message || !courseID) {
			res.status(400).send({ error: "Invalid Request..." })
		} else {
			const findCourse = await Course.findOne({ _id: courseID })
			if (findCourse) {
				const updateChats = await Course.findByIdAndUpdate(courseID, {
					chat: [...findCourse.chat, { id, name, time, message }]
				})
				if (updateChats) {
					const course = await Course.findOne({ _id: courseID })
					if (course) {
						res.send({ message: "message sent successfully", course })
					}
				} else {
					res.status(512).send({ error: "message not send..." })
				}
			} else {
				res.status(404).send({ error: "Course not found..." })
			}
		}
	} catch (err) {
		console.log(err)
	}
}
module.exports.addAnnouncementController = async (req, res) => {
	try {
		const { id, name, time, message, courseID } = req.body
		if (!id || !name || !time || !message || !courseID) {
			res.status(400).send({ error: "Invalid Request..." })
		} else {
			const findCourse = await Course.findOne({ _id: courseID })
			if (findCourse) {
				const updateAnnouncement = await Course.findByIdAndUpdate(courseID, {
					announcement: [...findCourse.announcement, { id, name, time, message }]
				})
				if (updateAnnouncement) {
					res.send({ message: "message send successfully" })
				} else {
					res.status(512).send({ error: "message not send..." })
				}
			} else {
				res.status(404).send({ error: "Course not found..." })
			}
		}
	} catch (err) {
		console.log(err)
	}
}
module.exports.delSpecificStudentByTeacher = async (req, res) => {
	try {
		const { courseID, studentID } = req.body
		if (!courseID || !studentID) {
			res.status(400).send({ error: "Invalid Request..." })
		} else {
			const findCourse = await Course.findById(courseID)
			const findStudent = await User.findById(studentID)
			if (findCourse && findStudent) {
				const deleteStudentFromCourse = findCourse.students.filter(student => student.id !== studentID)
				const updateCourseStudents = await Course.findByIdAndUpdate(courseID, {
					students: deleteStudentFromCourse
				})

				const findCourseInStudent = findStudent.courses.find(currentCourse => currentCourse.id === courseID)
				findCourseInStudent.removedByTeacher = true
				const filterCoursesInStudent = findStudent.courses.filter(currentCourse => currentCourse.id !== courseID)
				filterCoursesInStudent.push(findCourseInStudent)
				const updateStudentCourses = await User.findByIdAndUpdate(studentID, {
					courses: filterCoursesInStudent
				})
				if (updateCourseStudents && updateStudentCourses) {
					res.send({ message: "Student Deleted successfully" })
				} else {
					res.status(512).send({ error: "message not send..." })
				}
			} else {
				res.status(404).send({ error: "Course not found..." })
			}
		}
	} catch (error) {
		console.log(error)
	}
}
module.exports.deleteCourseFromStudent = async (req, res) => {
	try {
		const { id } = req.body;
		if (!id) {
			res.status(400).send({ error: "Invalid Request..." });
		} else {
			const findStudent = await User.findById(id)
			if (findStudent) {
				const filtered = findStudent.courses.filter(course => course.removedByTeacher === false)
				const updateStudentCourses = await User.findByIdAndUpdate(id, {
					courses: filtered
				})
				if (updateStudentCourses) {
					res.send({ message: "Courses updated Successfully" });
				} else {
					res.status(400).send({ error: "Student Not Found..." });
				}
			} else {
				res.status(400).send({ error: "Student Not Found..." });
			}
		}
	} catch (err) {
		res.status(500).send({ error: "server error" });
	}
};
module.exports.muteStudentController = async (req, res) => {
	try {
		const { courseID, studentID } = req.body
		if (!courseID || !studentID) {
			res.status(400).send({ error: "Invalid Request..." })
		} else {
			const findCourse = await Course.findById(courseID)
			const findStudent = findCourse.students.find(student => student.id === studentID)
			if (findCourse && findStudent) {
				if (findStudent.muted) {
					findStudent.muted = false
				} else {
					findStudent.muted = true
				}
				const filterOthers = findCourse.students.filter(student => student.id !== studentID)
				const updateCourseStudents = await Course.findByIdAndUpdate(courseID, {
					students: [...filterOthers, findStudent]
				})
				if (updateCourseStudents) {
					res.send({ message: "Student Muted..." })
				} else {
					res.status(505).send({ error: "Student Not Mute..." })
				}
			} else {
				res.status(404).send({ error: "Student Or Course Not Found..." })
			}
		}
	} catch (error) {
		console.log(error)
		res.status(300).send({ error })

	}
}
