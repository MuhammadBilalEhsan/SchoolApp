import React, { useEffect, useState } from 'react'
import { Box, } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Header from "./Header";
import TabsComp from './TabsComp';
import Stream from './Stream';
import Announcement from './Announcement';
import CourseStudentsComp from './CourseStudentsComp';
import AssignmentComp from './AssignmentComp';
import { useParams } from 'react-router-dom'

import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { currentCourseFunc } from '../redux/actions';

const useStyles = makeStyles({
	class_materials: {
		width: "100vw",
		height: "100vh"
	}
})


const ClassMaterials = ({ curUser, setAuth }) => {
	const currentCourse = useSelector((state) => state.usersReducer.currentCourse);
	// const [currentCourse, setCurrentCourse] = useState(currentCourseFunc)

	const classes = useStyles()
	const params = useParams()

	const dispatch = useDispatch()

	useEffect(async () => {
		const res = await axios.post(`/course/specific`, { id: params.id })
		if (res.data.currentCourse) {
			dispatch(currentCourseFunc(res.data.currentCourse))
		} else {
			console.log(res.data.error)
		}
	}, [])
	
	return (
		<Box className={classes.class_materials}>
			<Header curUser={curUser} setAuth={setAuth} />
			<Box>
				<TabsComp
					tab1Label="Stream"
					panel1={<Stream currentCourse={currentCourse} curUser={curUser} />}

					tab2Label={curUser?.roll === "teacher" ? "Class Work" : "Assignments"}
					panel2={<AssignmentComp isTeacher={curUser?.roll === "teacher" ? true : false} currentCourse={currentCourse} curUser={curUser} />}

					tab3Label={curUser?.roll === "teacher" ? "Students" : "Announcement"}
					panel3={curUser?.roll === "teacher" ? <CourseStudentsComp currentCourse={currentCourse} curUser={curUser} /> : < Announcement currentCourse={currentCourse} curUser={curUser} />}

					tab4Label={curUser?.roll === "teacher" ? "Announcement" : ""}
					panel4={curUser?.roll === "teacher" ? <Announcement currentCourse={currentCourse} curUser={curUser} /> : ""}
				/>
			</Box>
		</Box>
	);
};

export default ClassMaterials