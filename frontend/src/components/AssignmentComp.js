import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Tooltip } from "@mui/material";
import AssignmentAccordion from './AssignmentAccordion';
import Assignment from './Assignment';
import { MdAdd } from "react-icons/md";
import axios from 'axios';
import SubmittedAndChecked from './SubmittedAndChecked'
import CheckedAssignments from './CheckedAssignments'

const AssignmentComp = ({ curUser, isTeacher, currentCourse }) => {
    const [allAssignments, setAllAssignments] = useState(null)
    const [currentAssignmentID, setCurrentAssignmentID] = useState("");
    const [currentCourseID, setCurrentCourseID] = useState("");
    const [checked, setChecked] = useState(null);

    console.log("checkedInAccordionCOmp", checked)
    useEffect(async () => {
        const res = await axios.post("assignment/allassignments", { courseID: currentCourse?._id })
        setAllAssignments(res.data.allAssignments)
    }, [])
    return (
        <Box sx={{ maxWidth: "760px", margin: "0 auto" }}>
            {currentAssignmentID && isTeacher ? <SubmittedAndChecked checked={checked} currentAssignmentID={currentAssignmentID} />
                : !isTeacher && currentCourseID ? <CheckedAssignments currentCourseID={currentCourseID} />
                    : <Box>
                        <Box display="flex" justifyContent="flex-end" px={2} width="100%" >
                            {isTeacher ? (
                                <Assignment
                                    btnTitle="create"
                                    btnVariant="contained"
                                    btnColor="success"
                                    input2label="Questions and Instructions"
                                    tooltipTitle="Create Assignment"
                                    btnStartIcon={<MdAdd size="20px" color="white" />}
                                    dialogTitle="Create Assignment or Questions"
                                    actionTitle="create"
                                    currentCourse={currentCourse}
                                    isTeacher={isTeacher}
                                />
                            ) : <Tooltip title="Go to checked Assignments" arrow>
                                <Button onClick={() => setCurrentCourseID(currentCourse?._id)} color="success" sx={{ marginTop: 3, borderRadius: 5 }} variant="contained">
                                    Checked
                                </Button>

                            </Tooltip>
                            }
                        </Box>

                        <Box display="flex" justifyContent="flex-start" pb={1} px={2} width="100%" >
                            <Typography variant="h4" color="green">
                                {isTeacher ? "" : "Non Submitted "}Assignments
                            </Typography>
                        </Box>
                        {
                            allAssignments?.length > 0 ?
                                allAssignments?.map((assignment, index) => {
                                    const check = assignment?.submitted.find(student => student.id === curUser._id)
                                    if (!check) {
                                        return (
                                            <AssignmentAccordion
                                                key={index}
                                                curUser={curUser}
                                                isTeacher={isTeacher}
                                                assignment={assignment}
                                                setCurrentAssignmentID={setCurrentAssignmentID}
                                                setChecked={setChecked}
                                            />
                                        )
                                    }
                                }) : <Box pt={9} borderTop="1px solid green" width="100%"
                                    textAlign="center"
                                >
                                    <Typography variant="h6" color="green">
                                        Currently No Assignments
                                    </Typography>
                                </Box>
                        }
                    </Box>
            }

        </Box>
    )
}

export default AssignmentComp
