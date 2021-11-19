import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Tooltip, Collapse, Box, Chip } from '@mui/material';
import { MdMoreVert, MdFavorite, MdOutlineExpandMore } from 'react-icons/md';
import { ImBoxAdd } from 'react-icons/im';
import img from "../images/school.jpg";


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function CourseCard({ curElem }) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { courseDesc, courseName, courseOutline, dateOfCreation, duration, students, teacherClass, teacherEmail, teacher_id, topics } = curElem
    // const times = new Date(dateOfCreation)
    // const time = `${times.getDate()} ${times.getUTCMonth()}`
    return (
        <Card
            sx={{
                display: "inline-block",
                minWidth: 245,
                maxWidth: 345,
                marginX: 2
            }} >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "green", textTransform: "capitalize" }} aria-label={courseName}>
                        {teacherEmail[0]}
                    </Avatar>
                }
                action={
                    <Tooltip title="Enroll Now">
                        <IconButton sx={{ marginLeft: 2 }} aria-label="Enroll Now">
                            <ImBoxAdd color="green" />
                        </IconButton>
                    </Tooltip>
                }
                title={courseName}
                subheader={`From: ${teacherEmail}`}
            />
            {/* <CardMedia
                component="img"
                height="150"
                image={img}
                alt="Paella dish"
            /> */}
            {/* <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {courseDesc}
                </Typography>
            </CardContent> */}
            <CardActions>
                {/* <IconButton aria-label="add to favorites">
                    <MdFavorite />
                </IconButton> */}
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <MdOutlineExpandMore />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Box mt={1} >
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
                        {/* <EditCourse curUser={curUser} /> */}
                        {/* <AddCourse
                            curUser={curUser}
                            editCourse={true}
                            course={course}
                        /> */}
                    </Box>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default CourseCard