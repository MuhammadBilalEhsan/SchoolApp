import React, { useState } from 'react'
import { Box, Typography, Avatar, Menu, MenuItem, Button } from '@mui/material'
import { FiMoreVertical } from "react-icons/fi"
import SendingMessageInputComp from "./SendingMessageInputComp"


const CourseStudentsComp = ({ curUser }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMsgBox, setOpenMsgBox] = useState(null);
    const [message, setMessage] = useState("");
    const open = Boolean(anchorEl);

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
    const sendMsgFunc = (e) => {
        console.log("Value", message)
        setOpenMsgBox(false)
    }

    return (
        <>
            <Box sx={{ maxWidth: "760px", margin: "0 auto" }}>
                {openMsgBox ? <SendingMessageInputComp
                    name="msg"
                    autoFocus={true}
                    value={message}
                    setValue={setMessage}
                    placeholder="Send Message"
                    color="success"
                    submitFunc={sendMsgFunc}
                    userName={curUser?.fname[0]}
                /> : <></>
                }

                <Box display="flex" justifyContent="space-between" pb={1} px={2} borderBottom="1.5px solid #009c0052" width="100%" >
                    <Typography variant="h4" color="green">
                        Students
                    </Typography>
                    <Typography variant="body1" mt={3} color="green">
                        82 students
                    </Typography>
                </Box>
                <Box p="10px 20px" mt={1} width="85%" display="flex" justifyContent="space-between" sx={{ borderRadius: "10px", "&:hover": { backgroundColor: "#009c0026", boxShadow: 3, cursor: "pointer" } }} width="100%" >
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Box minWidth="65px" >
                            <Avatar sizes="50px" sx={{ bgcolor: "green", textTransform: "capitalize" }}>r</Avatar>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: "16px", }}>Bilal Ehsan</Typography>
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
                        <MenuItem onClick={toggleMsgBox}>Send Message</MenuItem>
                        <MenuItem onClick={(e) => removeStudentFunc(e)}>Remove</MenuItem>
                        <MenuItem onClick={(e) => muteStudentFunc(e)}>Mute</MenuItem>
                    </Menu>
                </Box>
            </Box>
        </>
    )
}

export default CourseStudentsComp
