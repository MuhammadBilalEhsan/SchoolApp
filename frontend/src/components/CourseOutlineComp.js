import React, { useState } from "react";
import { TextField, Box, Typography } from "@mui/material";

const CourseOutlineComp = ({
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
	return (
		<>
			{[...Array(selectDurInd + 1)].map((curElem, ind) => {
				return (
					<>

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
						{
							console.log("selectDurInd", selectDurInd)
						}
						{/* {
							console.log("courseOutlineObj", courseOutlineObj)
						}
						{
							console.log("setCourseOutlineObj", setCourseOutlineObj)
						}
						{
							console.log("coOutErr", coOutErr)
						}
						{
							console.log("editCourse", editCourse)
						} */}
						{coOutErr ? (
							<p style={{ color: "red", marginLeft: "5px" }}>
								Please Enter This week Outline
							</p>
						) : (
							""
						)}
					</>
				)
			})}
			{/* {selectDurInd === 0 ? (
				<Box>
					<Typography mb={1}>Describe Course Outline</Typography>
					<TextField
						margin="dense"
						name="week1"
						label="Week 1"
						type="text"
						variant="outlined"
						value={courseOutlineObj.week1}
						onChange={(e) => handleChange(e)}
						autoComplete="off"
						color={editCourse ? "warning" : "success"}
						fullWidth
					/>
					
				</Box>
			) : selectDurInd === 1 ? (
				<Box>
					<Typography mb={1}>Describe Course Outline</Typography>
					<TextField
						margin="dense"
						name="week1"
						label="Week 1"
						type="text"
						variant="outlined"
						value={courseOutlineObj.week1}
						onChange={(e) => handleChange(e)}
						autoComplete="off"
						color={editCourse ? "warning" : "success"}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="week2"
						label="Week 2"
						type="text"
						variant="outlined"
						value={courseOutlineObj.week2}
						onChange={(e) => handleChange(e)}
						autoComplete="off"
						color={editCourse ? "warning" : "success"}
						fullWidth
					/>
					{coOutErr ? (
						<p style={{ color: "red", marginLeft: "5px" }}>
							Please Enter Course Outline
						</p>
					) : (
						""
					)}
				</Box>
			) : selectDurInd === 2 ? (
				<Box>
					<Typography mb={1}>Describe Course Outline</Typography>
					<TextField
						margin="dense"
						name="week1"
						label="Week 1"
						type="text"
						variant="outlined"
						value={courseOutlineObj.week1}
						onChange={(e) => handleChange(e)}
						autoComplete="off"
						color={editCourse ? "warning" : "success"}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="week2"
						label="Week 2"
						type="text"
						variant="outlined"
						value={courseOutlineObj.week2}
						onChange={(e) => handleChange(e)}
						autoComplete="off"
						color={editCourse ? "warning" : "success"}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="week3"
						label="Week 3"
						type="text"
						variant="outlined"
						value={courseOutlineObj.week3}
						onChange={(e) => handleChange(e)}
						autoComplete="off"
						color={editCourse ? "warning" : "success"}
						fullWidth
					/>
					{coOutErr ? (
						<p style={{ color: "red", marginLeft: "5px" }}>
							Please Enter Course Outline
						</p>
					) : (
						""
					)}
				</Box>
			) : selectDurInd === 3 ? (
				<Box>
					<Typography mb={1}>Describe Course Outline</Typography>
					<TextField
						margin="dense"
						name="week1"
						label="Week 1"
						type="text"
						variant="outlined"
						value={courseOutlineObj.week1}
						onChange={(e) => handleChange(e)}
						autoComplete="off"
						color={editCourse ? "warning" : "success"}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="week2"
						label="Week 2"
						type="text"
						variant="outlined"
						value={courseOutlineObj.week2}
						onChange={(e) => handleChange(e)}
						autoComplete="off"
						color={editCourse ? "warning" : "success"}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="week3"
						label="Week 3"
						type="text"
						variant="outlined"
						value={courseOutlineObj.week3}
						onChange={(e) => handleChange(e)}
						autoComplete="off"
						color={editCourse ? "warning" : "success"}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="week4"
						label="Week 4"
						type="text"
						variant="outlined"
						value={courseOutlineObj.week4}
						onChange={(e) => handleChange(e)}
						autoComplete="off"
						color={editCourse ? "warning" : "success"}
						fullWidth
					/>
					{coOutErr ? (
						<p style={{ color: "red", marginLeft: "5px" }}>
							Please Enter Course Outline
						</p>
					) : (
						""
					)}
				</Box>
			) : (
				""
			)} */}
		</>
	);
};

export default CourseOutlineComp;
