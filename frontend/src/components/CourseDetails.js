import React, { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab, Chip, Button } from "@mui/material";
import Header from "./Header";
import AddCourse from "./AddCourse";
import { useSelector } from "react-redux";
import CDTeacher from "./CDTeacher";
// import EditCourse from "./EditCourse";

const CourseDetails = ({ curUser }) => {

	const course = useSelector((state) => state.usersReducer.course);
	

	if (curUser.roll === "teacher") {
		return <CDTeacher curUser={curUser} course={course} />;
	} else {
		return (
			<>
				<Box className={`_main`}>
					<Header />
					<Box width="100%">
						<Typography variant="h1"> Student</Typography>
					</Box>
				</Box>
			</>
		);
	}
};

export default CourseDetails;
