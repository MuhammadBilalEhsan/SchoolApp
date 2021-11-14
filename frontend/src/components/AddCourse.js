import React, { useState } from "react";
import {
	Tooltip,
	Fab,
	DialogTitle,
	DialogContent,
	DialogActions,
	Dialog,
	TextField,
	Menu,
	MenuItem,
	Button,
} from "@mui/material/";
import AddTopic from "./AddTopic";
// import ChipInput from "material-ui-chip-input";
import { MdUpload, MdKeyboardArrowDown } from "react-icons/md";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const duration = ["1 Week", "2 Week", "3 Week", "4 Week"];

export default function AddCourse({ curUser }) {
	const uidFromLocalStorage = localStorage.getItem("uid");
	const [open, setOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(null);
	const [selectDurInd, setSelectDurInd] = useState(null);
	const [topicChips, setTopicChips] = useState([]);

	// https://www.npmjs.com/package/material-ui-chip-input

	console.log(topicChips);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	// const handleAddChip = (chip) => {
	// 	formik.initialValues.topics.push(chip);
	// };
	// const handleDeleteChip = (chip) => {
	// 	const newArr = formik.initialValues.topics.filter((c) => c != chip);
	// 	formik.initialValues.topics.splice(
	// 		0,
	// 		formik.initialValues.topics.length,
	// 		...newArr,
	// 	);
	// };

	const handleMenuOpen = (e) => {
		setMenuOpen(e.currentTarget);
	};
	const handleMenuClose = () => {
		setMenuOpen(false);
	};
	const handleSelect = (index) => {
		setSelectDurInd(index);
		handleMenuClose();
	};
	const formik = useFormik({
		initialValues: {
			teacher_id: uidFromLocalStorage,
			teacherEmail: curUser.email,
			courseName: "",
			courseDesc: "",
			topics: [],
			duration: selectDurInd + 1,
			// completingMindset:[]
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
					Create Course
				</DialogTitle>
				<DialogContent>
					<form onSubmit={formik.handleSubmit}>
						<TextField
							autoFocus
							margin="dense"
							name="courseName"
							label="Name"
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
							label="Description"
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
						{/* <ChipInput
							fullWidth
							variant="outlined"
							name="topics"
							color="success"
							value={formik.values.topics}
							onAdd={(chip) => handleAddChip(chip)}
							onDelete={(chip, index) => handleDeleteChip(chip, index)}
						/> */}

						{/* add Topic field */}

						<AddTopic topicChips={topicChips} setTopicChips={setTopicChips} />

						{/* add duration field */}
						<Button
							onClick={handleMenuOpen}
							color="success"
							endIcon={<MdKeyboardArrowDown />}
						>
							{duration[selectDurInd] || "Duration"}
						</Button>
						<Menu
							open={Boolean(menuOpen)}
							anchorEl={menuOpen}
							onClose={handleMenuClose}
						>
							{duration.map((item, index) => (
								<MenuItem
									key={index}
									onClick={() => handleSelect(index)}
									name="duration"
								>
									{item}
								</MenuItem>
							))}
						</Menu>
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
