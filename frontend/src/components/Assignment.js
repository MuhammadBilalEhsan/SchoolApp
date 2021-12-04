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
import axios from 'axios'
import moment from 'moment'

const Assignment = ({
    currentCourse, btnTitle, tooltipTitle, curUser,
    btnIcon, dialogTitle, actionTitle, isTeacher,
    btnStartIcon, btnColor, btnVariant, currentAssignment, input2label
}) => {
    const [openAssignDialog, setOpenAssignDialog] = useState(false)
    const [file, setFile] = useState(null)

    const handleDialog = () => {
        setOpenAssignDialog(true)
    }
    const closeDialog = () => {
        setOpenAssignDialog(false)
    }

    const handleChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            const size = ((selectedFile.size / 1024) / 1024)
            if (size > 10) {
                alert("file Size is too long")
            } else {
                setFile(selectedFile)
            }
        }
    }
    const formik = useFormik({
        initialValues: {
            title: isTeacher ? "" : currentAssignment?.title,
            desc: "",
        },
        validationSchema: yup.object().shape({
            title: yup.string().required("Title is Required Field..."),
        }),

        onSubmit: async (values) => {
            try {
                if (!file && !values.desc) {
                    alert("You cannot leave both files and description blank at the same time")
                } else {
                    let formData = new FormData();
                    if (!values.desc && file) {
                        formData.append("myFile", file)
                    } else if (!file && values.desc) {
                        formData.append("desc", values.desc)
                    } else {
                        formData.append("desc", values.desc)
                        formData.append("myFile", file)
                    }
                    const config = {
                        headers: { "content-type": "multipart/form-data" },
                    };
                    if (isTeacher) {
                        formData.append("title", values.title)
                        formData.append("courseID", currentCourse?._id)
                        const res = await axios.post("assignment/add", formData, config)
                        if (res) {
                            console.log(res.data.message || res.data.error)
                            setFile(null)
                            values = {}
                            closeDialog()
                        }
                    } else {
                        formData.append("assignmentID", currentAssignment?._id)
                        formData.append("id", `${curUser?._id}`)
                        formData.append("name", `${curUser?.fname} ${curUser?.lname}`)
                        formData.append("time", moment().format("hh:mm:ss A"))
                        const res = await axios.post("assignment/submit", formData, config)
                        if (res) {
                            console.log(res.data.message || res.data.error)
                            setFile(null)
                            closeDialog()
                        }
                    }
                }
            } catch (error) {
                console.log(error);
                closeDialog()
            }
        }
    });

    return (
        <>
            <Tooltip title={tooltipTitle} arrow>
                <Button startIcon={btnStartIcon} onClick={handleDialog} color={btnColor}
                    sx={{ marginTop: isTeacher ? 3 : 0, borderRadius: 5 }} variant={btnVariant}>{btnTitle || btnIcon}</Button>
            </Tooltip>
            <Dialog open={openAssignDialog} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent >
                    <form method="POST">
                        <TextField
                            autoFocus
                            margin="dense"
                            name="title"
                            label="Title"
                            type="text"
                            variant="filled"
                            value={isTeacher ? formik.values.title : currentAssignment?.title}
                            onChange={formik.handleChange("title")}
                            autoComplete="off"
                            disabled={isTeacher ? false : true}
                            fullWidth
                            color="success"
                            inputProps={{ maxLength: 32, required: true }}
                        />
                        {formik.errors.title && formik.touched.title && (
                            <p style={{ color: "red", marginLeft: "5px" }}>
                                {formik.errors.title}
                            </p>
                        )}
                        <TextField
                            margin="dense"
                            name="desc"
                            label={input2label}
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
                                {file ? file.name : "No File Selected"}
                            </Typography></Box>
                            <Tooltip title="Attech File" arrow>
                                <Button
                                    component="label"
                                    sx={{ borderRadius: 5 }}
                                >
                                    <GrAttachment size="20px" color="white" />
                                    <input
                                        type="file"
                                        // value={file}
                                        onChange={(e) => handleChange(e)}
                                        accept=".zip,.txt,.psd,.pptx,.pptx,.png,.jpeg,.jpg,.pdf,.docx,.doc"
                                        hidden
                                    />
                                </Button>
                            </Tooltip>
                        </Box>
                    </form>

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
