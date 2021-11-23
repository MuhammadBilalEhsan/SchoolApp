import React, { useState, useEffect } from "react";
import { Tooltip, Fab, DialogTitle, DialogContent, DialogActions, Dialog, TextField, Menu, MenuItem, Button, } from "@mui/material/";
import AddTopic from "./AddTopic";
import CourseOutlineComp from "./CourseOutlineComp";
import { MdUpload, MdKeyboardArrowDown } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiFileEditFill } from "react-icons/ri";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const durationArr = ["1 Week", "2 Weeks", "3 Weeks", "4 Weeks"];

export default function AddCourse({ curUser, editCourse, course }) {
	const uidFromLocalStorage = localStorage.getItem("uid");
	const [open, setOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(null);
	const [selectDurInd, setSelectDurInd] = useState(null);
	const [topicChips, setTopicChips] = useState([]);
	const [topicErr, setTopicErr] = useState(null);
	const [coOutErr, setCoOutErr] = useState(null);
	const [weekNotSelected, setWeekNotSelected] = useState(null);

	const [courseOutlineObj, setCourseOutlineObj] = useState({});
	// let { courseName, courseDesc, topics, duration, courseOutline } = course;
	// console.log(course);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleMenuOpen = (e) => {
		setWeekNotSelected(false);
		setCoOutErr(false);
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
			teacherClass: curUser.atClass,
			courseName: editCourse ? course.courseName : "",
			courseDesc: editCourse ? course.courseDesc : "",
			topics: null,
			duration: null,
			courseOutline: null,
		},
		validationSchema: yup.object().shape({
			courseName: yup.string()
				.max(12, "Enter Course name less then 12 Characters")
				.required("Course Name is Required Field."),
			courseDesc: yup.string()
				.max(100, "Enter Course Description less then 100 Characters")
				.required("Course Description is Required Field."),
		}),


		onSubmit: async (values) => {
			try {
				setCoOutErr(false);
				if (topicChips.length == 0) {
					setTopicErr(true);
				} else {
					const courseOutline = Object.values(courseOutlineObj).filter(
						(curElem) => curElem !== "",
					);
					if (!selectDurInd) {
						setWeekNotSelected(true);
					}
					values.topics = topicChips;
					values.duration = selectDurInd + 1;
					values.courseOutline = courseOutline;
					if (
						values.duration !== values.courseOutline.length ||
						values.courseOutline.length === 0
					) {
						setCoOutErr(true);
					} else {
						if (editCourse) {
							console.log("Edit Course", values)
							const res = await axios.post("course/editcourse", values);
							if (res.data.message) {
								alert(res.data.message);
							} else {
								alert(res.data.error);
							}
							handleClose();
						} else {
							console.log("Add Course", values)
							const res = await axios.post("course/add", values);
							if (res.data.message) {
								alert(res.data.message);
								console.log(res.data.message);
							} else {
								alert(res.data.error);
							}
							handleClose();
						}
					}
				}
			} catch (error) {
				console.log(error);
				handleClose();
			}
		}
	});
	const delCourseFunc = async (e) => {
		try {
			e.preventDefault();
			const res = await axios.post("course/delcourse", {
				teacher_id: uidFromLocalStorage,
			});
			if (res.data.message) {
				alert(res.data.message);
				console.log(res.data.message);
			} else {
				alert(res.data.error);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (editCourse) {
			setSelectDurInd(course?.duration - 1)
		}
	})
	return (
		<div>
			{editCourse ? (
				<>
					<Tooltip title="Edit Course" arrow>
						<Button
							sx={{ marginTop: 3, marginLeft: 2 }}
							size="small"
							variant="contained"
							color="warning"
							onClick={handleClickOpen}
						>
							<RiFileEditFill size="20px" color="#fff" />
						</Button>
					</Tooltip>
					<Tooltip title="Delete Course" arrow>
						<Button
							sx={{ marginTop: 3, marginLeft: 2 }}
							size="small"
							variant="outlined"
							color="error"
							onClick={(e) => delCourseFunc(e)}
						>
							<FaRegTrashAlt color="red" size="20px" />
						</Button>
					</Tooltip>
				</>
			) : (
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
			)}
			{/* Openning Dialouge Box */}
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle align="center" backgroundColor="white">
					{editCourse ? "Edit Course" : "Create Course"}
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
							color={editCourse ? "warning" : "success"}

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
							multiline
							color={editCourse ? "warning" : "success"}
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
							editCourse={editCourse}
							course={course}
						/>

						{/* add duration field */}
						<Button
							onClick={(e) => {
								handleMenuOpen(e);
								setCourseOutlineObj({});
							}}
							color={editCourse ? "warning" : "success"}
							endIcon={<MdKeyboardArrowDown />}
						>
							{/* {durationArr[selectDurInd] || "Duration"} */}
							{
								editCourse ? durationArr[course?.duration - 1] : durationArr[selectDurInd] || "Duration"
							}
						</Button>
						{weekNotSelected ?
							(<p style={{ color: "red", marginLeft: "5px" }}>
								Please Select Duration of Your Course
							</p>) : (<></>)
						}
						<Menu
							open={Boolean(menuOpen)}
							anchorEl={menuOpen}
							onClose={handleMenuClose}
						>
							{durationArr.map((item, index) => (
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
								course={course}
								selectDurInd={selectDurInd}
								courseOutlineObj={courseOutlineObj}
								setCourseOutlineObj={setCourseOutlineObj}
								coOutErr={coOutErr}
								editCourse={editCourse}
								course={course}
							/>
						) : (
							<></>
						)}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						color={editCourse ? "warning" : "success"}
						variant="contained"
						onClick={formik.handleSubmit}
					>
						Save Edit
					</Button>

					<Button
						color={editCourse ? "warning" : "success"}
						onClick={handleClose}
					>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
