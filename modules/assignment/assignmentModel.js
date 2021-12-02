const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema({
    course_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: false
    },
    // Automatic fillable fields
    createdAt: {
        type: String,
        required: true
    },
    // Updateable Fields
    submitted: {
        type: Array,
        required: true
    },
});

const Assignment = mongoose.model("assignments", assignmentSchema);

module.exports = Assignment;
