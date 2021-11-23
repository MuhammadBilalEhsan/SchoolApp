import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Chip, Grid } from "@mui/material";
import Header from "./Header";
import AddCourse from "./AddCourse";

const CDTeacher = ({ curUser, course }) => {
	const [value, setValue] = useState(0);

	let { courseName, courseDesc, topics, duration, courseOutline } =
		course || {};
	const handleTabs = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<>
			<Box className={`_main`}>
				<Header />
				<Box width="95%" maxWidth="1100px" marginX="auto">
					<Box display="flex" justifyContent="space-around" mt={3}>
						<Typography variant="h4">
							{`${curUser.fname} ${curUser.lname}(${curUser.roll})`}
						</Typography>
						{/* course={course} */}
						<AddCourse curUser={curUser} course={course} editCourse={false} />
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
							<Tab label="My Course" />
							<Tab label="Students" />
						</Tabs>
						<TabPanel value={value} index={0}>
							{course && Object.entries(course).length > 0 ? (
								<Grid container>
									<Grid item mt={1} sm={6} xs={12} sx={{ wordWrap: "break-word" }}>
										<Typography color="black" variant="subtitle1">
											Course Name:
										</Typography>
										<Typography ml={5} variant="body2">
											{courseName}
										</Typography>

										<Typography color="black" variant="subtitle1">
											Description:
										</Typography>
										<Typography ml={5} variant="body2">
											{courseDesc}
										</Typography>

										<Typography color="black" variant="subtitle1">
											Topics:
										</Typography>
										<Box ml={4}>
											{topics?.map((curElem, ind) => {
												return (
													<Chip
														key={ind}
														sx={{ marginLeft: 1, marginBottom: 1 }}
														color="success"
														size="small"
														label={curElem.label}
														variant="outlined"
													/>
												);
											})}
										</Box>
										<Typography color="black" variant="subtitle1">
											Duration:
										</Typography>
										<Typography ml={5} variant="body2">
											{duration} week / weeks
										</Typography>
									</Grid>
									<Grid item mt={1} sm={6} xs={12} sx={{ wordWrap: "break-word" }}>
										<Typography color="black" variant="subtitle1">
											Course Outline:
										</Typography>
										{courseOutline?.map((curElem, ind) => {
											return (
												<Box key={ind}>
													<Typography color="black" ml={5} variant="body2">
														week {ind + 1}:
													</Typography>
													<Typography ml={9} variant="body1">
														{curElem}
													</Typography>
												</Box>
											);
										})}
										{/* <EditCourse curUser={curUser} /> */}
										<AddCourse
											curUser={curUser}
											editCourse={true}
											course={course}
										/>
									</Grid>
								</Grid>
							) : (
								<Box
									sx={{
										marginTop: "15px",
										width: "100%",
										minHeight: "80%",
										color: "green",
										justifyContent: "center",
										alignItems: "center",
										bgcolor: "background.paper",
									}}
								>
									<Typography marginX="auto" variant="subtitle1">
										Currently No Course.
									</Typography>
								</Box>
							)}
						</TabPanel>

						<TabPanel value={value} index={1}>
							{course?.students?.length > 0 ? (
								<Box>{course.courseDesc}</Box>
							) : (
								<Box width="100%" border={1} borderColor="slateblue">
									<Typography marginX="auto" variant="subtitle1">
										No Students
									</Typography>
								</Box>
							)}
						</TabPanel>
					</Box>
				</Box>
			</Box>
		</>
	);
};

function TabPanel(props) {
	const { children, value, index } = props;
	return (
		<Box width="100%" p={5} display="flex" justifyContent="space-between">
			{value == index && <> {children} </>}
		</Box>
	);
}

export default CDTeacher;
