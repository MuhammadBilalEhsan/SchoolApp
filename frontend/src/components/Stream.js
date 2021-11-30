import React, { useState } from 'react'
import { Box, Avatar, Typography, TextField } from '@mui/material'
// import { useSelector } from 'react-redux'
import SendingMessageInputComp from "./SendingMessageInputComp"
import streamImg from "../images/stream.jpg"

const Stream = ({ curUser }) => {
    const [comment, setComment] = useState("")
    const submitFunc = (e) => {
        console.log("submitFunc running from Stream")
        console.log("Value", comment)
    }

    return (
        <>
            <Box maxWidth="1100px" display="flex" flexDirection="column" justifyContent="center" sx={{ marginX: "auto" }}>
                <Box sx={{ width: "100%", height: "240px", borderRadius: "10px", marginTop: 3 }}>
                    <img src={streamImg} width="100%" height="100%" style={{ borderRadius: "10px" }} alt="BackGround Image" />
                </Box>
                {/* Message Box */}
                <MessageBox />
                <SendingMessageInputComp
                    name="comment"
                    autoFocus={false}
                    value={comment}
                    setValue={setComment}
                    placeholder="Add Comment to Your Students"
                    color="success"
                    submitFunc={submitFunc}
                    userName={curUser?.fname[0]}
                />
            </Box >
        </>
    )
}

const MessageBox = () => {
    return (
        <Box sx={{ width: "100%", borderRadius: "7.5px", marginTop: 3, padding: "1rem 1.5rem", border: "1.8px solid #00000033" }}>
            <Box width="100%">
                <Box display="flex" justifyContent="center">
                    <Box width="65px" >
                        <Avatar sx={{ bgcolor: "green", textTransform: "capitalize" }}>r</Avatar>
                    </Box>
                    <Box flexGrow={1}>
                        <Typography variant="subtitle1" color="green"><b> kljakfjdsakjfdkjadfskjkasdj</b></Typography>
                        <Typography variant="body2" color="#2e7d32de"> asdj</Typography>
                    </Box>
                </Box>
            </Box>
            <Box width="100%" mt={2} sx={{ wordWrap: "break-word", paddingLeft: 5 }}>
                <Typography variant="subtitle2">WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW</Typography>
            </Box>
        </Box>
    )
}

export default Stream
