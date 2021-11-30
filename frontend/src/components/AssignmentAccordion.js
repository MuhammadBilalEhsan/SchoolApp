import React, { useState } from 'react'
import { Box, Typography, Avatar, Button, Accordion, AccordionDetails, Tooltip, Menu, MenuItem, AccordionSummary } from "@mui/material"
import { MdAssignment } from "react-icons/md"
import { useHistory } from "react-router-dom"
import { AiOutlineExclamationCircle } from "react-icons/ai"
import { MdOutlineMoreVert } from "react-icons/md"

const AssignmentAccordion = () => {
    const [expanded, setExpanded] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
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
        console.log("previewAssignment")
    }
    const Submited = (event) => {
        event.stopPropagation();
        history.push(`submitted/12345`)
        handleClose()
    }
    const Checked = (event) => {
        event.stopPropagation();
        history.push(`checked/67890`)
        handleClose()
    }

    return (
        <>
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
                            <Typography sx={{ fontSize: "16px", }}>Assignment Title</Typography>
                        </Box>
                    </Box>
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
                            <MenuItem onClick={Submited}>Submited</MenuItem>
                            <MenuItem onClick={Checked}>Checked</MenuItem>
                        </Menu>
                        <Tooltip arrow title="Preview Assignment">
                            <Button
                                sx={{ color: "black", borderRadius: 5 }}
                                size="small"
                                onClick={(e) => previewAssignment(e)}
                            >
                                <AiOutlineExclamationCircle size="23px" style={{ margin: "auto 0px" }} />
                            </Button>
                        </Tooltip>
                    </Box>
                </AccordionSummary>

                <AccordionDetails>
                    <Typography> Accordion Description</Typography>
                </AccordionDetails>

            </Accordion>
        </>
    )
}

export default AssignmentAccordion
