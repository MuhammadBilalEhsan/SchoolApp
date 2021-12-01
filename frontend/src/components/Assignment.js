import React, { useState } from 'react'
import { GrAttachment } from "react-icons/gr"
import {
    Button,
    Tooltip,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    TextField,
    Typography,
    Box
} from "@mui/material"
import { useFormik } from 'formik'
import *as yup from "yup"

const Assignment = ({ btnTitle, tooltipTitle, btnIcon, dialogTitle, actionTitle, isTeacher }) => {
    const [openAssignDialog, setOpenAssignDialog] = useState(false)
    const [file, setFile] = useState()
    const handleDialog = () => {
        setOpenAssignDialog(true)
    }
    const closeDialog = () => {
        setOpenAssignDialog(false)
    }
    const actionFunc = (e) => {
        console.log("actionFunc is Running Softly")
        closeDialog()
    }
    const formik = useFormik({
        initialValues: {
            title: "",
            desc: "",
            file: file,
        },
        validationSchema: yup.object().shape({
        }),


        onSubmit: async (values) => {
            try {
                console.log("values", values)
            } catch (error) {
                console.log(error);
                closeDialog()
            }
        }
    });
    return (
        <>
            <Tooltip title={tooltipTitle} arrow>
                <Button startIcon={btnIcon} onClick={handleDialog} color="success"
                    sx={{ marginTop: 3, borderRadius: 5 }} variant="contained">{btnTitle}</Button>
            </Tooltip>
            <Dialog open={openAssignDialog} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent >
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Title"
                        type="text"
                        variant="filled"
                        value={formik.values.title}
                        onChange={formik.handleChange("title")}
                        autoComplete="off"
                        fullWidth
                        color="success"
                        inputProps={{ maxLength: 32 }}
                    />
                    <TextField
                        margin="dense"
                        name="desc"
                        label="Description"
                        type="text"
                        variant="filled"
                        value={formik.values.desc}
                        onChange={formik.handleChange("desc")}
                        autoComplete="off"
                        fullWidth
                        color="success"
                        multiline
                        minRows={2}
                        inputProps={{ maxLength: 500 }}
                    />
                    <Box width="100%" display="flex" justifyContent="flex-end" alignItems="center">
                        <Box border="1px solid rgba(0, 0, 0, 0.09)" px={"14px"} mt={1} py={"7px"} flexGrow={1}><Typography variant="subtitle1">
                            {file ? file.name : "Select File"}
                        </Typography></Box>
                        <Tooltip title="Attech File" arrow>
                            <Button
                                component="label"
                                sx={{ borderRadius: 5 }}
                            >
                                <GrAttachment size="20px" color="white" />
                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    accept=".zip,.txt,.psd,.pptx,.pptx,.png,.jpeg,.jpg,.pdf,.docx,.doc"
                                    hidden
                                />
                            </Button>
                        </Tooltip>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={formik.handleSubmit} color="success" variant="contained">{actionTitle}</Button>
                    <Button onClick={closeDialog} color="success" variant="outlined">cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Assignment
