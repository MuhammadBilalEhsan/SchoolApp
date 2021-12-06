import React, { useState, useEffect } from "react";
import {
	Tooltip, Fab, DialogTitle, DialogContent, DialogActions, Dialog, TextField,
	Menu, MenuItem, Button,
} from "@mui/material/";
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
	const [selectDurInd, setSelectDurInd] = useState(String(course?.duration) || null);
	const [topicChips, setTopicChips] = useState([]);
	const [topicErr, setTopicErr] = useState(null);
	const [coOutErr, setCoOutErr] = useState(null);
	const [editEditCourse, setEditEditCourse] = useState(true);
	const [weekNotSelected, setWeekNotSelected] = useState(null);

	const [courseOutlineArr, setCourseOutlineArr] = useState([]);
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
		setEditEditCourse(false)
		const objsOfCOArr = [...Array(index + 1)].map(() => {
			const obj = { week: "" }
			return obj;
		})
		setCourseOutlineArr(objsOfCOArr)
		setSelectDurInd(String(index));
		handleMenuClose();

	};

	const formik = useFormik({
		initialValues: {
			teacher_id: uidFromLocalStorage,
			teacherEmail: curUser?.email,
			teacherClass: curUser?.atClass,
			courseName: editCourse ? course?.courseName : "",
			courseDesc: editCourse ? course?.courseDesc : "",
			topics: null,
			duration: null,
			courseOutline: null,
		},
		validationSchema: yup.object().shape({
			courseName: yup.string()
				.required("Course Name is Required Field."),
			courseDesc: yup.string()
				.required("Course Description is Required Field."),
		}),


		onSubmit: async (values) => {
			try {
				setCoOutErr(false);
				if (topicChips.length === 0) {
					setTopicErr(true);
				} else {
					if (!selectDurInd) {
						setWeekNotSelected(true);
					} else {
						const cOutlineFiltered = courseOutlineArr.filter((curElem) => curElem.week !== "")
						if (cOutlineFiltered.length !== courseOutlineArr.length) {
							setCoOutErr(true)
						} else {
							values.topics = topicChips;
							values.duration = courseOutlineArr.length;
							values.courseOutline = courseOutlineArr;
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
				}
			} catch (error) {
				console.log(error);
				handleClose();
			}
		}
	});
	// const delCourseFunc = async (e) => {
	// 	try {
	// 		e.preventDefault();
	// 		const res = await axios.post("course/delcourse", {
	// 			teacher_id: uidFromLocalStorage,
	// 		});
	// 		if (res.data.message) {
	// 			alert(res.data.message);
	// 			console.log(res.data.message);
	// 		} else {
	// 			alert(res.data.error);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	useEffect(() => {
		if (editCourse) {
			setCourseOutlineArr(course?.courseOutline)
		} else {
			setCourseOutlineArr([])
		}
		// console.log(courseOutlineArr)
	}, [])
	return (
		<div>
			{editCourse ? (
				// <>
				<Tooltip title="Edit Course" arrow>
					<Button
						size="small"
						onClick={handleClickOpen}
						sx={{ borderRadius: 5, }}
					>
						<RiFileEditFill size="22px" color="orange" />
					</Button>
				</Tooltip>
				// 	<Tooltip title="Delete Course" arrow>
				// 		<Button
				// 			size="small"
				// 			onClick={(e) => delCourseFunc(e)}
				// 			sx={{ borderRadius: 5 }}
				// 		>
				// 			<FaRegTrashAlt color="red" size="22px" />
				// 		</Button>
				// 	</Tooltip>
				// </>
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
							inputProps={{ maxLength: 12 }}

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
							inputProps={{ maxLength: 100 }}
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
							style={{ display: "flex", background: "orange" }}

						/>
						{/* add duration field */}
						<Button
							onClick={(e) => {
								handleMenuOpen(e);
								setCourseOutlineArr([]);
							}}
							color={editCourse ? "warning" : "success"}
							endIcon={<MdKeyboardArrowDown />}
						>
							{/* {durationArr[selectDurInd] || "Duration"} */}
							{
								editCourse && editEditCourse ? durationArr[String(selectDurInd - 1)] : durationArr[selectDurInd] || "Duration"
							}
						</Button>
						{
							weekNotSelected ?
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
						{
							selectDurInd || editCourse ? (
								<CourseOutlineComp
									courseOutlineArr={courseOutlineArr}
									editCourse={editCourse}
									coOutErr={coOutErr}
									onChange={(e, index) => {
										setCourseOutlineArr(prev => {
											let tempCourse = [...prev];
											tempCourse[index].week = e.target.value;
											return tempCourse;
										})
									}}
								/>
							) : (
								<></>
							)
						}


					</form>
				</DialogContent>
				<DialogActions>
					<Button
						color={editCourse ? "warning" : "success"}
						variant="contained"
						onClick={formik.handleSubmit}
					>
						{editCourse ? "Save Edit" : "Create"}
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
