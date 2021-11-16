import React, { useState } from "react";
import { TextField, Box, Typography } from "@mui/material";

const CourseOutlineComp = ({
	selectDurInd,
	courseOutlineObj,
	setCourseOutlineObj,
	coOutErr,
	setCoOutErr,
}) => {
	// const [courseOutlineObj, setcourseOutlineObj] = useState("");

	let name, value;
	const handleChange = (e) => {
		name = e.target.name;
		value = e.target.value;
		setCourseOutlineObj({ ...courseOutlineObj, [name]: value });
	};
	return (
		<>
			{selectDurInd === 0 ? (
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
						color="success"
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
						color="success"
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
						color="success"
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
						color="success"
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
						color="success"
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
						color="success"
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
						color="success"
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
						color="success"
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
						color="success"
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
						color="success"
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
			)}
		</>
	);
};

export default CourseOutlineComp;