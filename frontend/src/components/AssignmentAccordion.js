import React, { useState } from 'react'
import { Box, Typography, Avatar, Button, Accordion, AccordionDetails, Tooltip, Menu, MenuItem, AccordionSummary } from "@mui/material"
import { MdAssignment } from "react-icons/md"
import { useHistory } from "react-router-dom"
import { AiOutlineExclamationCircle } from "react-icons/ai"
import { MdOutlineMoreVert, MdUpload } from "react-icons/md"
import Assignment from './Assignment'

// import Submitted from './Submitted'


const AssignmentAccordion = ({ curUser, isTeacher, assignment }) => {
    const [expanded, setExpanded] = useState(false);
    const [openSubmitted, setOpenSubmitted] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const history = useHistory()

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        // event.stopPropagation();
        setAnchorEl(null);
    };
    const previewAssignment = (e) => {
        e.stopPropagation();
        // console.log(assignment.file)
    }
    const Submited = (event) => {
        event.stopPropagation();
        // history.push(`submitted/${assignment?._id}`)
        // console.log(`submitted/${assignment?._id}`)
        handleClose()
    }
    const Checked = (event) => {
        event.stopPropagation();
        // history.push(`checked/${assignment._id}`)
        handleClose()
    }

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ marginTop: 1, "&:hover": { boxShadow: 3, cursor: "pointer" } }}  >
                <AccordionSummary
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Box minWidth="65px" >
                            <Avatar sx={{ bgcolor: "green", textTransform: "capitalize" }}><MdAssignment size="20px" color="white" /></Avatar>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: "16px", }}>{assignment?.title}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        {
                            assignment?.file ? <Tooltip arrow title={"View file"}>
                                <Button
                                    sx={{ color: "black", borderRadius: 5 }}
                                    size="small"
                                    onClick={(e) => previewAssignment(e)}
                                    target="_blanck"
                                    href={assignment?.file}
                                >
                                    <AiOutlineExclamationCircle size="23px" style={{ margin: "auto 0px" }} />
                                </Button>
                            </Tooltip>
                                : ""
                        }
                        {isTeacher ? (
                            <Box>
                                <Button
                                    sx={{ color: "green", borderRadius: 5 }}
                                    size="small"
                                    id="basic-button"
                                    aria-controls="basic-menu"
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <MdOutlineMoreVert size="23px" style={{ margin: "auto 0px" }} />
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

                                    {/* <MenuItem onClick={() => history.push(`submitted/${assignment?._id}`)}>Submited</MenuItem> */}
                                    {/* <MenuItem href={`submitted/${assignment?._id}`}>Submited</MenuItem> */}
                                    <MenuItem onClick={Submited}>Submited</MenuItem>
                                    <MenuItem onClick={Checked}>Checked</MenuItem>
                                </Menu>
                            </Box>
                        ) : (<Assignment
                            btnIcon={<MdUpload size="23px" style={{ margin: "auto 0px" }} />}
                            btnVariant="text"
                            btnColor="success"
                            tooltipTitle="Submit Assignment"
                            input2label="Answers"
                            currentAssignment={assignment}
                            dialogTitle="Submit Assignment"
                            actionTitle="submit"
                            curUser={curUser}
                            isTeacher={isTeacher}
                        />
                        )}
                    </Box>
                </AccordionSummary>

                <AccordionDetails>
                    <Typography> {assignment?.description ? assignment.description : "This Assignment have no desccription"}</Typography>
                </AccordionDetails>

            </Accordion>
        </div>
    )
}

export default AssignmentAccordion
