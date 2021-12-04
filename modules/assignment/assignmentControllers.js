const User = require("../user/userModel");
const Course = require("../course/courseModel");
const Assignment = require("../assignment/assignmentModel");
const admin = require("firebase-admin");
const fs = require("fs");

const bucket = admin.storage().bucket("gs://schoolapp-4ee60.appspot.com/");

module.exports.addAssignmentController = async (req, res) => {
    try {
        const { title, courseID, desc } = req.body
        const createdAt = new Date().toString()
        // const { file } = req.file
        if (!title || !courseID) {
            res.status(400).send({ error: "Invalid Request.." })
        } else {
            if (desc && !req.file) {
                const assignment = new Assignment({ title, courseID, description: desc, createdAt })
                const saveWithoutFile = await assignment.save()
                if (saveWithoutFile) {
                    res.send({ message: "Assignment Added Successfully..." })
                } else {
                    res.status(512).send({ error: "Unfourtunatly Assignment not saved ..." })
                }
            } else if (req.file && !desc) {
                bucket.upload(req.file.path,
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

                                        const assignment = new Assignment({ title, courseID, createdAt, file: pubURL })
                                        const saveWithoutDescription = await assignment.save()
                                        fs.unlinkSync(req.file.path);
                                        if (saveWithoutDescription) {
                                            res.send({ message: "Assignment Added Successfully..." })
                                        } else {
                                            res.status(512).send({ error: "Unfourtunatly Assignment not saved ..." })
                                        }
                                    }
                                } catch (error) {
                                    res.status(505).send({ error })
                                    console.log(error)
                                }
                            })
                        }
                    }
                )
            } else if (req.file && desc) {
                bucket.upload(req.file.path,
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

                                        const assignment = new Assignment({ title, courseID, description: desc, createdAt, file: pubURL })
                                        const saveWithBoth = await assignment.save()
                                        fs.unlinkSync(req.file.path);
                                        if (saveWithBoth) {
                                            res.send({ message: "Assignment Added Successfully..." })
                                        } else {
                                            res.status(512).send({ error: "Unfourtunatly Assignment not saved ..." })
                                        }
                                    }
                                } catch (error) {
                                    res.status(505).send({ error })
                                    console.log(error)
                                }
                            })
                        }
                    }
                )
            }
        }

    } catch (error) {
        console.log(error)

    }
}
module.exports.submitAssignmentController = async (req, res) => {
    try {
        const { assignmentID, id, name, time, desc } = req.body
        // const { file } = req.file
        if (!assignmentID || !id || !name || !time) {
            res.status(400).send({ error: "Invalid Request.." })
        } else {
            const findAssignment = await Assignment.findById(assignmentID)
            if (findAssignment) {
                const checkSubmit = findAssignment.submitted?.find(student => student.id === id)
                if (!checkSubmit) {
                    if (desc && !req.file) {
                        const assignmentObj = { id, name, desc, sumitAt: time, marks: 0 }
                        const submitWithoutFile = await Assignment.findByIdAndUpdate(assignmentID, {
                            submitted: [...findAssignment.submitted, assignmentObj]
                        })
                        if (submitWithoutFile) {
                            res.send({ message: "Assignment Submitted Successfully..." })
                        } else {
                            res.status(512).send({ error: "Unfourtunatly Assignment not saved ..." })
                        }
                    } else if (req.file && !desc) {
                        bucket.upload(req.file.path,
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
                                                const assignmentObj = { id, name, file: pubURL, sumitAt: time, marks: 0 }

                                                const submitWithoutDesc = await Assignment.findByIdAndUpdate(assignmentID, {
                                                    submitted: [...findAssignment.submitted, assignmentObj]
                                                })
                                                fs.unlinkSync(req.file.path);
                                                if (submitWithoutDesc) {
                                                    res.send({ message: "Assignment Submitted Successfully..." })
                                                } else {
                                                    res.status(512).send({ error: "Unfourtunatly Assignment not saved ..." })
                                                }
                                            }
                                        } catch (error) {
                                            res.status(505).send({ error })
                                            console.log(error)
                                        }
                                    })
                                }
                            }
                        )
                    } else if (req.file && desc) {
                        bucket.upload(req.file.path,
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

                                                const assignmentObj = { id, name, file: pubURL, desc, sumitAt: time, marks: 0 }
                                                const submitWithoutDesc = await Assignment.findByIdAndUpdate(assignmentID, {
                                                    submitted: [...findAssignment.submitted, assignmentObj]
                                                })
                                                fs.unlinkSync(req.file.path);
                                                if (submitWithoutDesc) {
                                                    res.send({ message: "Assignment Submitted Successfully..." })
                                                } else {
                                                    res.status(512).send({ error: "Unfourtunatly Assignment not saved ..." })
                                                }
                                            }
                                        } catch (error) {
                                            res.status(505).send({ error })
                                            console.log(error)
                                        }
                                    })
                                }
                            }
                        )
                    }
                } else {
                    res.status(400).send({ error: "You have already submitted the assignment.." })
                }
            } else {
                res.status(404).send({ error: "Assignment not Found.." })

            }
        }

    } catch (error) {
        console.log(error)

    }

}
module.exports.getAllAssignments = async (req, res) => {
    try {
        const { courseID } = req.body
        if (!courseID) {
            res.status(400).send({ error: "Invalid Request" })
        } else {
            const getAllAssignments = await Assignment.find({ courseID })
            if (getAllAssignments) {
                res.send({ allAssignments: getAllAssignments })
            } else {
                res.status(404).send({ error: "No Assignment Found" })
            }
        }
    } catch (error) {
        res.status(300).send({ error })
        console.log(error)
    }
}