import React, { useState } from 'react'
import {
    Button,
    Tooltip,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    TextField
} from "@mui/material"

const Assignment = ({ title, btnIcon, dialogTitle, actionTitle, isTeacher }) => {
    const [openAssignDialog, setOpenAssignDialog] = useState(false)
    const handleDialog = () => {
        setOpenAssignDialog(true)
    }
    const closeDialog = () => {
        setOpenAssignDialog(false)
    }
    const actionFunc = (e) => {
        console.log("actionFunc is Running Softly")
    }
    return (
        <>
            <Tooltip title={title}>
                <Button onClick={handleDialog} color="success" sx={{ marginTop: 3, paddingY: "3.5px" }} variant="contained">{btnIcon}</Button>
            </Tooltip>
            <Dialog open={openAssignDialog} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent >
                    <TextField
                        autoFocus
                        margin="dense"
                        name="courseName"
                        label="Course Name"
                        type="text"
                        variant="outlined"
                        // value={formik.values.courseName}
                        // onChange={formik.handleChange("courseName")}
                        autoComplete="off"
                        fullWidth
                        color="success"
                        multiline
                        minRows={4}
                        inputProps={{ maxLength: 500 }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => actionFunc(e)} color="success" variant="contained">{actionTitle}</Button>
                    <Button onClick={closeDialog} color="success" variant="outlined">cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Assignment
