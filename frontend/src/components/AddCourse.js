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
import CourseOutlineComp from "./CourseOutlineComp";
import { MdUpload, MdKeyboardArrowDown } from "react-icons/md";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const duration = ["1 Week", "2 Weeks", "3 Weeks", "4 Weeks"];

export default function AddCourse({ curUser }) {
	const uidFromLocalStorage = localStorage.getItem("uid");
	const [open, setOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(null);
	const [selectDurInd, setSelectDurInd] = useState(null);
	const [topicChips, setTopicChips] = useState([]);
	const [topicErr, setTopicErr] = useState(null);
	const [coOutErr, setCoOutErr] = useState(null);
	const iniState = {
		week1: "",
		week2: "",
		week3: "",
		week4: "",
	};
	const [courseOutlineObj, setCourseOutlineObj] = useState(iniState);
	// https://p.bdir.in/demo/A-Chips-Input-Field-In-React/7539
	// https://p.bdir.in/p/A-Chips-Input-Field-In-React/7539
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

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
			topics: null,
			duration: null,
			courseOutline: null,
		},
		validationSchema: yup.object().shape({
			courseName: yup.string().required(),
			courseDesc: yup.string().required(),
			// atClass: yup.number().required().positive().integer(),
			// age: yup.number().required().positive().integer(),
			// phone: yup.number().required().positive().integer(),
		}),

		onSubmit: async (values) => {
			try {
				setCoOutErr(false);
				if (topicChips.length == 0) {
					setTopicErr(true);
				}
				const courseOutline = Object.values(courseOutlineObj).filter(
					(curElem) => curElem !== "",
				);

				const topic = topicChips.map((item) => item.label);
				values.topics = topic;
				values.duration = selectDurInd + 1;
				values.courseOutline = courseOutline;
				if (
					values.duration !== values.courseOutline.length ||
					values.courseOutline.length === 0
				) {
					setCoOutErr(true);
				}
				const res = await axios.post("course/add", values);
				console.log(res);
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
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
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
						{/* add Topic field */}

						<AddTopic
							topicChips={topicChips}
							setTopicChips={setTopicChips}
							topicErr={topicErr}
							setTopicErr={setTopicErr}
						/>

						{/* add duration field */}
						<Button
							onClick={(e) => {
								handleMenuOpen(e);
								setCourseOutlineObj(iniState);
							}}
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
						{selectDurInd !== null ? (
							// <p>Describe Course Outline...</p>
							<CourseOutlineComp
								selectDurInd={selectDurInd}
								courseOutlineObj={courseOutlineObj}
								setCourseOutlineObj={setCourseOutlineObj}
								coOutErr={coOutErr}
								setCoOutErr={setCoOutErr}
							/>
						) : (
							""
						)}
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
