import React, { useState, useEffect } from 'react'
import { Box, Button, Typography, Avatar, Tooltip } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Header from "./Header";
import SendingMessageInputComp from "./SendingMessageInputComp";
import { AiOutlineExclamationCircle } from "react-icons/ai"
import { ImListNumbered } from "react-icons/im"
import { useParams } from "react-router-dom"


const useStyles = makeStyles({
    class_materials: {
        width: "100vw",
        height: "100vh"
    }
})


const AssignmentResponse = ({ checked, curUser }) => {

    const [showInput, setShowInput] = useState(false)
    const [marks, setMarks] = useState(0)

    const params = useParams()

    const toggle = (event) => {
        event.stopPropagation()
        if (showInput) {
            setShowInput(false)
        } else {
            setShowInput(true)
        }
    }
    const doFalse = (e) => {
        setShowInput(false)
    }
    const giveNumbersFunc = (e) => {
        console.log("giveNumbersFunc running from announcement")
        console.log("Value", marks)
    }

    useEffect(() => {
        if (checked) {
            console.log("id", params.id)
            console.log("checked true")
        } else {
            console.log("id", params.id)
            console.log("checked false")
        }
    }, [])
    const classes = useStyles()
    return (
        <>

            <Box className={classes.class_materials} onClick={(e) => doFalse(e)}>
                <Header curUser={curUser} />
                <Box maxWidth="760px" margin="0 auto">

                    <Box mt={3} display="flex" justifyContent="space-between" pb={1} mb={1} px={2} borderBottom="1.5px solid #009c0052" width="100%" >
                        <Typography variant="h4" color="green">
                            Students
                        </Typography>
                        <Typography variant="body1" mt={3} color="green">
                            82 students
                        </Typography>
                    </Box>
                    <Box mx={1} mb={1} sx={{ backgroundColor: "#fff", boxShadow: 2, "&:hover": { cursor: "pointer", boxShadow: 4, backgroundColor: "#0080000c" }, borderRadius: "12px", padding: "1rem 0px 1rem 1.5rem" }}>
                        <Box width="100%">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Box width="65px" >
                                    <Avatar sx={{ bgcolor: "green", textTransform: "capitalize" }}>r</Avatar>
                                </Box>
                                <Box flexGrow={1}>
                                    <Typography variant="h6" color="#0000009c" sx={{ color: "green", cursor: "pointer" }}>Student Name</Typography>
                                </Box>

                                <Typography ml={2} variant="body1">40 Marks</Typography>

                                <Box display="flex" flexWrap="wrap" justifyContent="flex-end">
                                    <Tooltip title="Give Marks" arrow>
                                        <Button
                                            onClick={toggle}
                                            sx={{ borderRadius: 5, color: "#000" }}
                                            size="small"
                                        >
                                            <ImListNumbered size="17px" />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Preview Assignment" arrow>
                                        <Button
                                            sx={{ borderRadius: 5, color: "black" }}
                                            size="small"
                                        >
                                            <AiOutlineExclamationCircle size="23px" />
                                        </Button>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box mx={1} onClick={(e) => { e.stopPropagation() }}>
                        {showInput ? <SendingMessageInputComp
                            name="marks"
                            autoFocus={true}
                            value={marks}
                            setValue={setMarks}
                            type="number"
                            placeholder="Give Marks Out of 100"
                            color="success"
                            submitFunc={giveNumbersFunc}
                            userName={curUser?.fname[0]}
                        /> : <></>
                        }
                    </Box>


                </Box>
            </Box >
        </>
    );
};

export default AssignmentResponse