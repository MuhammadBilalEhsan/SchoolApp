import React, { useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AccordionActions,
    Typography,
    Box,
    Button,
    Grid,
    Chip,
    Avatar,
    Tooltip
} from '@mui/material';
import axios from "axios"
import { MdOutlineExpandMore } from 'react-icons/md';
import { GrUserAdd } from 'react-icons/gr';

function CourseAcc({ curElem, curUser }) {
    const [expanded, setExpanded] = useState(false);
    const { fname, lname } = curUser
    const { _id, courseDesc, courseName, courseOutline, dateOfCreation, duration, students, teacherClass, teacherEmail, teacher_id, topics } = curElem
    const uid = localStorage.getItem("uid")
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const applyCourse = async (e) => {
        try {
            const obj = {
                student_name: `${fname} ${lname}`,
                courseName,
                course_id: _id,
                student_id: uid
            }
            console.log(obj)
            const res = await axios.post("course/applynow", obj)
            alert(res.data.message || res.data.error)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div style={{ marginBottom: 2 }}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ marginTop: 1, "&:hover": { boxShadow: 3, cursor: "pointer" } }}  >
                <AccordionSummary
                    expandIcon={<MdOutlineExpandMore />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Box display="flex" justifyContent="flex-start" alignItems="center">
                        <Box minWidth="65px" >
                            <Avatar sx={{ bgcolor: "green", textTransform: "capitalize" }}>{courseName[0]}</Avatar>
                        </Box>
                        <Typography ml={3} variant="body1" color="green" sx={{ wordWrap: "break-word", paddingX: 0.5 }}>
                            {courseName}
                        </Typography>
                    </Box>
                </AccordionSummary>
                {/* <Typography sx={{ color: 'text.secondary' }}>{`Duration: ${duration} Week / Weeks`}</Typography>
                </AccordionSummary> */}
                <AccordionDetails>
                    <Grid container>
                        <Grid item xs={12} sm={6} sx={{ wordWrap: "break-word" }}>
                            <Typography color="black" variant="subtitle2">
                                Course Name:
                            </Typography>
                            <Typography color="green" ml={5} variant="body2">
                                {courseName}
                            </Typography>

                            <Typography color="black" variant="subtitle2">
                                Description:
                            </Typography>
                            <Typography color="green" ml={5} variant="body2">
                                {courseDesc}
                            </Typography>

                            <Typography color="black" variant="subtitle2">
                                Topics:
                            </Typography>
                            <Box ml={4}>
                                {topics?.map((curElem, ind) => {
                                    return (
                                        <Chip
                                            key={ind}
                                            sx={{ marginLeft: 1, marginBottom: 1 }}
                                            color="success"
                                            size="small"
                                            label={curElem.label}
                                            variant="outlined"
                                        />
                                    );
                                })}
                            </Box>
                            <Typography color="black" variant="subtitle2">
                                Duration:
                            </Typography>
                            <Typography ml={5} variant="body2">
                                {duration} week / weeks
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ wordWrap: "break-word" }}>
                            <Typography color="black" variant="subtitle2">
                                Course Outline:
                            </Typography>
                            {courseOutline?.map((curElem, ind) => {
                                return (
                                    <Box key={ind}>
                                        <Typography color="black" ml={5} variant="body1">
                                            week {ind + 1}:
                                        </Typography>
                                        <Typography color="green" ml={9} variant="body2">
                                            {curElem.week}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Grid>
                    </Grid>
                </AccordionDetails>
                <AccordionActions>
                    <Tooltip title="Enroll Now" arrow>
                        <Button variant="contained" color="success" onClick={(e) => applyCourse(e)}><GrUserAdd color="green" size="22px" /></Button>
                    </Tooltip>
                </AccordionActions>
            </Accordion>
        </div>
    );
}

export default CourseAcc