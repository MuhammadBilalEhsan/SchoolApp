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
import { useHistory } from 'react-router-dom';
import axios from "axios"
import { MdOutlineExpandMore } from 'react-icons/md';
import { IoTrashBinSharp } from 'react-icons/io5';
import { VscPreview } from 'react-icons/vsc';
const uid = localStorage.getItem("uid")
const StudentTab2 = ({ curCor, ind }) => {
    const [expanded, setExpanded] = useState(false);

    const [thisCourse, setThisCourse] = useState({});
    const [allCourses, setAllCourses] = useState([]);

    const history = useHistory()

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const { courseName, courseDesc, topics, duration, courseOutline } = thisCourse

    const delCourse = async (e) => {
        try {
            const obj = {
                student_id: uid,
                course_id: curCor?.id,
            }
            const res = await axios.post("course/delencourse", obj)
            console.log(res.data.message ? res.data.message : res.data.error)
        } catch (error) {
            console.log(error)
        }
    }
    const curCourseDetails = async () => {
        try {
            const findLocally = allCourses?.find(item => item._id === curCor.id)
            if (findLocally) {
                setThisCourse(findLocally)
            } else {
                const res = await axios.post("course/getcourse", { id: curCor.id })
                setThisCourse(res.data.DBcourse)
                setAllCourses([...allCourses, res.data.DBcourse])
            }
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
                    <Grid container display="flex">
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
                            <Tooltip title="Delete Course">
                                <Button size="small" color="error" onClick={(e) => delCourse(e)} variant="contained"> <IoTrashBinSharp color="white" size="16px" /></Button>
                            </Tooltip>
                            <Tooltip title="Preview">
                                <Button size="small" color="success" onClick={(e) => history.push(`/course/${curCor?.id}`)} variant="contained"> <VscPreview color="white" size="16px" /></Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

        </div >
    )
}

export default StudentTab2