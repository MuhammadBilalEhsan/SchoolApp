import React, { useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Box,
    Button,
    Grid,
    Chip
} from '@mui/material';
import axios from "axios"
import { MdOutlineExpandMore } from 'react-icons/md';

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
                course_id: _id, student_id: uid
            }
            const res = await axios.post("course/applynow", obj)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div style={{ marginBottom: 2 }}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<MdOutlineExpandMore />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '45%', flexShrink: 0, wordWrap: "break-word", paddingX: 0.5 }}>
                        {`Course: ${courseName}`}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{`Duration: ${duration} Week / Weeks`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container>
                        <Grid item xs={12} sm={6} sx={{ wordWrap: "break-word" }}>
                            <Typography color="black" variant="subtitle2">
                                Course Name:
                            </Typography>
                            <Typography ml={5} variant="body2">
                                {courseName}
                            </Typography>

                            <Typography color="black" variant="subtitle2">
                                Description:
                            </Typography>
                            <Typography ml={5} variant="body2">
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
                                        <Typography color="black" ml={5} variant="body2">
                                            week {ind + 1}:
                                        </Typography>
                                        <Typography ml={9} variant="body1">
                                            {curElem}
                                        </Typography>
                                    </Box>
                                );
                            })}
                            <Button sx={{ justifySelf: "flex-end" }} color="success" onClick={(e) => applyCourse(e)} variant="contained">Apply Now</Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default CourseAcc