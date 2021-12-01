import React, { useEffect } from 'react'
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

const useStyles = makeStyles({
	class_materials: {
		width: "100vw",
		height: "100vh"
	}
})


const ClassMaterials = ({ curUser }) => {

	const classes = useStyles()
	const params = useParams()

	useEffect(async () => {
		// const res = await axios.post(`/course/specific`, { id: params.id })
		// console.log(res)
	}, [])
	return (
		<>
			<Box className={classes.class_materials}>
				<Header curUser={curUser} />
				<Box>
					<TabsComp
						tab1Label="Stream"
						panel1={<Stream curUser={curUser} />}

						// <DropDownComp />
						tab2Label={curUser?.roll === "teacher" ? "Class Work" : "Assignments"}
						// panel2={curUser?.roll === "teacher" ? <AssignmentComp curUser={curUser} /> : ""}
						panel2={<AssignmentComp curUser={curUser} />}

						tab3Label={curUser?.roll === "teacher" ? "Students" : null}
						panel3={curUser?.roll === "teacher" ? <CourseStudentsComp curUser={curUser} /> : null}

						tab4Label="Announcement"
						panel4={<Announcement curUser={curUser} />}
					/>
				</Box>
			</Box>
		</>
	);
};

export default ClassMaterials