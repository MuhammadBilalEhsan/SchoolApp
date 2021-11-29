import React, { useState } from 'react'
import { Box, Typography, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Header from "./Header";
import TabsComp from './TabsComp';
import Stream from './Stream';
import Announcement from './Announcement';

const useStyles = makeStyles({
	class_materials: {
		width: "100vw",
		height: "100vh"
	}
})


const ClassMaterials = ({ curUser }) => {
	const [navbar, setNavbar] = useState(false)
	const toggle = () => {
		if (navbar === false) {
			setNavbar(true)
		} else {
			setNavbar(false)
		}
	}
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
						panel2=""
						panel3=""
						panel4={<Announcement curUser={curUser} />}
					/>
				</Box>
			</Box>
		</>
	);
};

export default ClassMaterials