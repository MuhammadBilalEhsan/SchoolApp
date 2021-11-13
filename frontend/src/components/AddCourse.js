import React, { useState } from "react";
import {
	Tooltip,
	Fab,
	DialogTitle,
	DialogContent,
	DialogActions,
	Dialog,
	TextField,
	Button,
} from "@mui/material/";
import ChipInput from "material-ui-chip-input";
import { MdUpload } from "react-icons/md";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

export default function AddCourse({ curUser }) {
	const [open, setOpen] = useState(false);
	const uidFromLocalStorage = localStorage.getItem("uid");

	// https://www.npmjs.com/package/material-ui-chip-input

	const [myChips, setMyChips] = useState([]);
	const handleAddChip = (chip) => {
		setMyChips([...myChips, chip]);
	};
	const handleDeleteChip = (chip) => {
		const newArr = myChips.filter((c) => c != chip);
		setMyChips(newArr);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const formik = useFormik({
		initialValues: {
			teacher_id: uidFromLocalStorage,
			teacherName: `${curUser.fname} ${curUser.lname}`,
			courseName: "",
			courseDesc: "",
		},
		// validationSchema: yup.object().shape({
		// 	fname: yup.string().required(),
		// 	lname: yup.string().required(),
		// 	fatherName: yup.string().required(),
		// 	atClass: yup.number().required().positive().integer(),
		// 	age: yup.number().required().positive().integer(),
		// 	phone: yup.number().required().positive().integer(),
		// }),

		onSubmit: async (values) => {
			try {
				console.log(values);
			} catch (error) {
				console.log(error);
				handleClose();
			}
		},
	});

	return (
		<div>
			<Tooltip title="Add Course" arrow>
				<Fab
					size="small"
					sx={{
						backgroundColor: "green",
						"&:hover": {
							backgroundColor: "green",
						},
					}}
					onClick={handleClickOpen}
				>
					<MdUpload size="20px" color="#fff" />
				</Fab>
			</Tooltip>
			{/* Openning Dialouge Box */}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle align="center" backgroundColor="white">
					Edit Profile
				</DialogTitle>
				<DialogContent>
					<form onSubmit={formik.handleSubmit}>
						<TextField
							autoFocus
							margin="dense"
							name="courseName"
							label="Course Name"
							type="text"
							variant="outlined"
							value={formik.values.courseName}
							onChange={formik.handleChange("courseName")}
							autoComplete="off"
							fullWidth
							color="success"
							// required
						/>
						{formik.errors.courseName && formik.touched.courseName && (
							<p style={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.courseName}
							</p>
						)}
						<TextField
							margin="dense"
							name="courseDesc"
							label="Course Description"
							type="text"
							variant="outlined"
							value={formik.values.courseDesc}
							onChange={formik.handleChange("courseDesc")}
							autoComplete="off"
							fullWidth
							color="success"
							// required
						/>
						{formik.errors.courseDesc && formik.touched.courseDesc && (
							<p style={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.courseDesc}
							</p>
						)}
						{/* add Topics field */}
						{/* add duration field */}
					<ChipInput
						fullWidth
						variant="outlined"
						value={myChips}
						onAdd={(chip) => handleAddChip(chip)}
						onDelete={(chip, index) => handleDeleteChip(chip, index)}
					/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						color="success"
						variant="contained"
						onClick={formik.handleSubmit}
					>
						Save Edit
					</Button>

					<Button color="success" onClick={handleClose}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
