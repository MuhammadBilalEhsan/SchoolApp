import React, { useState } from 'react'
import { Box, Avatar, Typography, TextField } from '@mui/material'
// import { useSelector } from 'react-redux'
import streamImg from "../images/stream.jpg"
import { AiOutlineSend } from "react-icons/ai"

const Stream = ({ curUser }) => {

    return (
        <>
            <Box maxWidth="1100px" display="flex" flexDirection="column" justifyContent="center" sx={{ marginX: "auto" }}>
                <Box sx={{ width: "100%", height: "240px", borderRadius: "10px", marginTop: 3 }}>
                    <img src={streamImg} width="100%" height="100%" style={{ borderRadius: "10px" }} alt="BackGround Image" />
                </Box>
                {/* Message Box */}
                <MessageBox />
                <CurrentUserMessage curUser={curUser} />
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


const CurrentUserMessage = ({ curUser }) => {
    const [message, setMessage] = useState("")
    return (
        <Box sx={{ width: "100%", borderRadius: "7.5px", marginTop: 3, padding: "1rem 1.5rem", border: "1.8px solid #00000033" }}>
            <Box width="100%">
                <Box display="flex" justifyContent="center">
                    <Box width="65px" >
                        <Avatar sx={{ bgcolor: "green", textTransform: "capitalize" }}>{curUser?.fname[0]}</Avatar>
                    </Box>
                    <Box flexGrow={1}>
                        <TextField
                            autoFocus
                            name="message"
                            type="text"
                            placeholder="Add Comment"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            autoComplete="off"
                            fullWidth
                            multiline
                            color="success"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: (<AiOutlineSend size="26px" color="green" style={{ margin: "auto 1 0 0", }} />)
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Stream
