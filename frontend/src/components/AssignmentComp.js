import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Tooltip } from "@mui/material";
import AssignmentAccordion from './AssignmentAccordion';
import Assignment from './Assignment';
import { MdAdd } from "react-icons/md";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AssignmentComp = ({ curUser, isTeacher, currentCourse }) => {
    const [allAssignments, setAllAssignments] = useState(null)

    useEffect(async () => {
        const res = await axios.post("assignment/allassignments", { courseID: currentCourse?._id })
        setAllAssignments(res.data.allAssignments)
    }, [])
    const history = useHistory()
    return (
        <>
            <Box sx={{ maxWidth: "760px", margin: "0 auto" }}>
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

                        <Button onClick={() => history.push(`/studentchecked`)} color="success" sx={{ marginTop: 3, borderRadius: 5 }} variant="contained">
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
                            return (
                                <AssignmentAccordion
                                    key={index}
                                    curUser={curUser}
                                    isTeacher={isTeacher}
                                    assignment={assignment}
                                />
                            )
                        }) : <Box pt={9} borderTop="1px solid green" width="100%"
                            textAlign="center"
                        >
                            <Typography variant="h6" color="green">
                                Currently No Assignments
                            </Typography>
                        </Box>
                }
            </Box>
        </>
    )
}

export default AssignmentComp



                // <Box component={Accordion} expanded={expanded === 'panel1'} onChange={handleChange('panel1')} p="10px 20px" mt={1} width="85%" display="flex" justifyContent="space-between" sx={{ borderRadius: "10px", "&:hover": { boxShadow: 3, cursor: "pointer" } }} width="100%" >
                //     <Box display="flex" justifyContent="center" alignItems="center">
                //         <Box minWidth="65px" >
                //             <Avatar sizes="50px" sx={{ bgcolor: "green", textTransform: "capitalize" }}><MdAssignment size="20px" color="white" /></Avatar>
                //         </Box>
                //         <Box>
                //             <Typography sx={{ fontSize: "16px", }}>Bilal Ehsan</Typography>
                //         </Box>
                //     </Box>
                //     {/* 3 dots */}
                //     <Button
                //         id="basic-button"
                //         sx={{ color: "black", borderRadius: 5 }}
                //         variat="contained"
                //         size="small"
                //     >
                //         {/* <FiMoreVertical size="23px" style={{ margin: "auto 0px" }} /> */}
                //         abc
                //     </Button>

                //     <AccordionDetails>
                //         <Typography>
                //             Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                //             Aliquam eget maximus est, id dignissim quam.
                //         </Typography>
                //     </AccordionDetails>







                // </Box>