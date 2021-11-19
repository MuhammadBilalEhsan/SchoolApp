import React, { useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    Box,
    Chip
} from '@mui/material';
import { MdMoreVert, MdFavorite, MdOutlineExpandMore } from 'react-icons/md';

function CourseAcc({ curElem }) {
    const [expanded, setExpanded] = useState(false);

    const { _id, courseDesc, courseName, courseOutline, dateOfCreation, duration, students, teacherClass, teacherEmail, teacher_id, topics } = curElem

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div style={{ marginBottom: 2 }}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<MdOutlineExpandMore />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {`Course: ${courseName}`}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{`Duration: ${duration} Week / Weeks`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box mt={1} display="flex" >
                        <Box width="49%">
                            <Typography color="black" variant="h6">
                                Course Name:
                            </Typography>
                            <Typography ml={5} variant="subtitle1">
                                {courseName}
                            </Typography>

                            <Typography color="black" variant="h6">
                                Description:
                            </Typography>
                            <Typography ml={5} variant="subtitle1">
                                {courseDesc}
                            </Typography>

                            <Typography color="black" variant="h6">
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
                            <Typography color="black" variant="h6">
                                Duration:
                            </Typography>
                            <Typography ml={5} variant="subtitle1">
                                {duration} week / weeks
                            </Typography>
                        </Box>
                        <Box width="49%">
                            <Typography color="black" variant="h6">
                                Course Outline:
                            </Typography>
                            {courseOutline?.map((curElem, ind) => {
                                return (
                                    <Box key={ind}>
                                        <Typography color="black" ml={5} variant="subtitle1">
                                            week {ind + 1}:
                                        </Typography>
                                        <Typography ml={9} variant="body1">
                                            {curElem}
                                        </Typography>
                                    </Box>
                                );
                            })}

                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default CourseAcc