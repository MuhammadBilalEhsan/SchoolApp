import React from 'react'
import { Box, Avatar, Typography } from "@mui/material"

const Announcement = () => {
    return (
        <>
            <Box maxWidth="1100px" display="flex" flexDirection="column" justifyContent="center" sx={{ marginX: "auto" }}>
                {/* Announce SomeThing to Your Class */}
                <Box sx={{ width: "100%", "&:hover": { color: "green", cursor: "pointer" }, borderRadius: "12px", marginTop: 3, backgroundColor: "#00710012", padding: "1rem 1.5rem", boxShadow: 4 }}>
                    <Box width="100%">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Box width="65px" >
                                <Avatar sx={{ bgcolor: "green", textTransform: "capitalize" }}>r</Avatar>
                            </Box>
                            <Box flexGrow={1} >
                                <Typography color="#0000009c" sx={{ fontSize: "14px", "&:hover": { color: "green", cursor: "pointer", textDecoration: "underline" } }}>Announce Something to Your Students</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Announcements */}
                {/* <Box sx={{ width: "100%", borderRadius: "12px", marginTop: 3, padding: "1rem 1.5rem", border: "1.8px solid #00000033" }}>
                    <Box width="100%">
                        <Box display="flex" justifyContent="center">
                            <Box width="65px" >
                                <Avatar sx={{ bgcolor: "green", textTransform: "capitalize" }}>r</Avatar>
                            </Box>
                            <Box flexGrow={1} mt={1}>
                                <Typography color="#0000009c">Announce Something to Your Students</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box> */}


                {/* Announces */}
                <Box sx={{ width: "100%", borderRadius: "12px", marginTop: 3, padding: "1rem 1.5rem", border: "1.8px solid #00000033" }}>
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
                        <Typography variant="subtitle2">WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW</Typography>
                    </Box>
                </Box>
            </Box >
        </>
    )
}


export default Announcement

