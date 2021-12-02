import React, { useState } from 'react';
import { Box, Typography, Avatar, Menu, MenuItem, Button } from '@mui/material';
import { FiMoreVertical } from "react-icons/fi";
import SendingMessageInputComp from "./SendingMessageInputComp";
import moment from "moment";
import axios from "axios";

const CourseStudentsComp = ({ currentCourse, curUser }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMsgBox, setOpenMsgBox] = useState(null);
    const [message, setMessage] = useState("");
    const open = Boolean(anchorEl);

    const { _id, fname, lname } = curUser || {}

    const toggleMsgBox = () => {
        if (openMsgBox) {
            setOpenMsgBox(false)
        } else {
            setOpenMsgBox(true)
        }
        handleClose()
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const removeStudentFunc = (e) => {
        handleClose()
    }
    const muteStudentFunc = (e) => {
        handleClose()
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    const sendMsgFunc = async (e) => {
        try {
            const newMessage = message.trim()

            if (newMessage) {
                const name = `${fname} ${lname}`
                let time = moment().format('hh:mm A')
                const messageObj = {
                    id: _id, name, time, message: newMessage, student_id: "mkjkll"
                }
                console.log("messageObj", messageObj)
                await axios.post("user/sendmsg", messageObj)
                setMessage("")
            } else {
                alert("write something")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box>
            <Box sx={{ maxWidth: "760px", margin: "0 auto" }}>
                {openMsgBox ? <SendingMessageInputComp
                    name="message"
                    autoFocus={true}
                    value={message}
                    setValue={setMessage}
                    type="text"
                    placeholder={`Write Message for this student`}
                    color="success"
                    submitFunc={sendMsgFunc}
                    userName={curUser?.fname[0]}
                /> : ""
                }

                <Box display="flex" justifyContent="space-between" pb={1} px={2} borderBottom="1.5px solid #009c0052" width="100%" >
                    <Typography variant="h4" color="green">
                        Students
                    </Typography>
                    <Typography variant="body1" mt={3} color="green">
                        {currentCourse?.students?.length > 0 ? currentCourse.students.length : "No"} students
                    </Typography>
                </Box>
                {currentCourse?.students?.length > 0 ? currentCourse.students.map((currentStudent, index) => {
                    return (
                        <Box key={index} p="10px 20px" mt={1} width="85%" display="flex" justifyContent="space-between" sx={{ borderRadius: "10px", "&:hover": { backgroundColor: "#009c0026", boxShadow: 3, cursor: "pointer" } }} width="100%" >
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Box minWidth="65px" >
                                    <Avatar sizes="50px" sx={{ bgcolor: "green", textTransform: "capitalize" }}>{currentStudent.name[0]}</Avatar>
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: "16px", }}>{currentStudent.name}</Typography>
                                </Box>
                            </Box>
                            {/* 3 dots */}
                            <Button
                                id="basic-button"
                                sx={{ color: "black", borderRadius: 5 }}
                                aria-controls="basic-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                size="small"
                            >
                                <FiMoreVertical size="23px" style={{ margin: "auto 0px" }} />
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={() => toggleMsgBox()}>Send Message</MenuItem>
                                <MenuItem onClick={(e) => removeStudentFunc(e)}>Remove</MenuItem>
                                <MenuItem onClick={(e) => muteStudentFunc(e)}>Mute</MenuItem>
                            </Menu>
                        </Box>
                    )
                }) : ""
                }

            </Box>
        </Box>
    )
}

export default CourseStudentsComp

