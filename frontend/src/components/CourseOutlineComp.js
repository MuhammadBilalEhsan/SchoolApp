import React, { useEffect } from "react";
import { TextField } from "@mui/material";

const CourseOutlineComp = ({
	course,
	selectDurInd,
	courseOutlineObj,
	setCourseOutlineObj,
	coOutErr,
	editCourse,
}) => {

	let name, value;
	const handleChange = (e) => {
		name = e.target.name;
		value = e.target.value;
		setCourseOutlineObj({ ...courseOutlineObj, [name]: value });
	};
	useEffect(() => {
		if (editCourse) {
			setCourseOutlineObj({
				week1: course?.courseOutline[0] || "",
				week2: course?.courseOutline[1] || "",
				week3: course?.courseOutline[2] || "",
				week4: course?.courseOutline[3] || "",
			})
		} else {
			setCourseOutlineObj({
				week1: "",
				week2: "",
				week3: "",
				week4: "",
			})
		}
		console.log(course?.courseOutline[0])
	}, [])
	return (
		<>
			{
				[...Array(selectDurInd + 1)].map((curElem, ind) => {
					return (
						<span key={ind}>

							<TextField
								margin="dense"
								name={`week${ind + 1}`}
								label={`week ${ind + 1}`}
								type="text"
								variant="outlined"
								value={courseOutlineObj[Object.keys(courseOutlineObj)[ind]]}
								onChange={(e) => handleChange(e)}
								autoComplete="off"
								color={editCourse ? "warning" : "success"}
								fullWidth
							/>
							{coOutErr ? (
								<p style={{ color: "red", marginLeft: "5px" }}>
									Please Enter This week Outline
								</p>
							) : (
								""
							)}
						</span>
					)
				})
			}
		</>
	);
};

export default CourseOutlineComp;
