const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
	teacherName: {
		type: String,
		required: true,
	},
	teacher_id: {
		type: String,
		required: true,
	},
	courseName: {
		type: String,
		required: true,
	},
	courseDesc: {
		type: String,
		required: true,
	},
	topics: {
		type: Array,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	// Automatic fillable fields

	dateOfCreation: {
		type: String,
		required: true,
	},

	//
	students: [],
});

const Course = mongoose.model("courses", courseSchema);

module.exports = Course;
