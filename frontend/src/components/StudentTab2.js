import React, { useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Box,
    Button,
    Grid,
    Chip,
    Tooltip
} from '@mui/material';
import axios from "axios"
import { MdOutlineExpandMore } from 'react-icons/md';
const StudentTab2 = ({ curCor, ind }) => {
    const [expanded, setExpanded] = useState(false);
    const [thisCourse, setThisCourse] = useState({});
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const { courseName, courseDesc, topics, duration, courseOutline } = thisCourse

    const applyCourse = async (e) => {
        try {
            console.log("StudentTab2 working")
        } catch (error) {
            console.log(error)
        }
    }
    const curCourseDetails = async () => {
        try {
            const res = await axios.post("course/getcourse", { id: curCor.id })
            setThisCourse(res.data.DBcourse)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div style={{ marginBottom: 2 }}>
            <Accordion expanded={expanded === 'panel1'} onClick={curCourseDetails} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<MdOutlineExpandMore onClick={curCourseDetails} />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ color: 'text.secondary', width: '40%' }}>Course {ind + 1}</Typography>
                    <Typography variant="body1" color="green" sx={{ flexShrink: 0, wordWrap: "break-word", paddingX: 0.5 }}>
                        {curCor?.name}
                    </Typography>
                </AccordionSummary>
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
                            <Tooltip title="Enroll Now">
                                <Button size="small" color="success" onClick={(e) => applyCourse(e)} variant="contained">{/* < GrUserAdd color = "white" size = "14px" /> */}</Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

        </div >
    )
}

export default StudentTab2