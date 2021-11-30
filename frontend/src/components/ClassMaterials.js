import React, { useState } from 'react'
import { Box, Typography, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Header from "./Header";
import TabsComp from './TabsComp';
import Stream from './Stream';
import Announcement from './Announcement';
import CourseStudentsComp from './CourseStudentsComp';
import AssignmentComp from './AssignmentComp';

const useStyles = makeStyles({
	class_materials: {
		width: "100vw",
		height: "100vh"
	}
})


const ClassMaterials = ({ curUser }) => {
	const classes = useStyles()
	return (
		<>
			<Box className={classes.class_materials}>
				<Header />
				<Box>
					<TabsComp
						tab1Label="Stream"
						tab2Label="Class Work"
						tab3Label="Students"
						tab4Label="Announcement"
						panel1={<Stream curUser={curUser} />}
						panel2={<AssignmentComp curUser={curUser} />}
						panel3={<CourseStudentsComp curUser={curUser} />}
						panel4={<Announcement curUser={curUser} />}
					/>
				</Box>
			</Box>
		</>
	);
};

export default ClassMaterials