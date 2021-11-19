import React, { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab, Chip, Button } from "@mui/material";
import Header from "./Header";
import { useSelector } from "react-redux";
import CDTeacher from "./CDTeacher";
import CDStudent from "./CDStudent";

const CourseDetails = ({ curUser }) => {

	const course = useSelector((state) => state.usersReducer.course);
	const courses = useSelector((state) => state.usersReducer.studentCourse);


	if (curUser.roll === "teacher") {
		return <CDTeacher curUser={curUser} course={course} />;
	} else {
		return <CDStudent curUser={curUser} courses={courses} />;
	}
};

export default CourseDetails;
