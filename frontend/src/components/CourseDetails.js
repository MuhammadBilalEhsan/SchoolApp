import React, { useState, useEffect } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import Header from "./Header";
import AddCourse from "./AddCourse";

const CourseDetails = ({ curUser }) => {
	const [value, setValue] = useState(0);

	const handleTabs = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		// console.log(curUser);
	}, []);
	if (curUser.roll === "teacher") {
		return (
			<>
				<Box className={`_main`}>
					<Header />
					<Box width="70%" marginX="auto">
						<Box display="flex" justifyContent="space-around" mt={3}>
							<Typography variant="h4">
								{`${curUser.fname} ${curUser.lname}(${curUser.roll})`}
							</Typography>

							<AddCourse curUser={curUser} />
						</Box>
						<Box
							sx={{
								marginTop: "15px",
								width: "100%",
								color: "green",
								bgcolor: "background.paper",
							}}
						>
							<Tabs
								value={value}
								onChange={handleTabs}
								textColor="inherit"
								TabIndicatorProps={{
									sx: {
										backgroundColor: "green",
									},
								}}
								centered
							>
								<Tab label="Item One" />
								<Tab label="Item Two" />
							</Tabs>
							<TabPanel value={value} index={0}>
								One
							</TabPanel>

							<TabPanel value={value} index={1}>
								Two
							</TabPanel>
						</Box>
					</Box>
				</Box>
			</>
		);
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

function TabPanel(props) {
	const { children, value, index } = props;
	return (
		<Box width="50%" sx={{ marginX: "auto", padding: "5px" }}>
			{value == index && <> {children} </>}
		</Box>
	);
}
