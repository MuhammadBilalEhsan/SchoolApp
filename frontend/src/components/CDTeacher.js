import React from "react";
import { Box, Typography, Chip, Grid, Button } from "@mui/material";
import Header from "./Header";
import AddCourse from "./AddCourse";
import { useHistory } from "react-router-dom";
// import Assignment from "./Assignment"
// import { MdAssignment } from "react-icons/md"


const CDTeacher = ({ curUser, course }) => {

	let { courseName, courseDesc, topics, duration, courseOutline } =
		course || {};

	const history = useHistory()
	return (
		<>
			<Box className={`_main`}>
				<Header curUser={curUser} />
				<Box width="95%" maxWidth="1100px" marginX="auto">
					<Box display="flex" justifyContent="space-around" mt={3}>
						<Typography variant="h4">
							{`${curUser.fname} ${curUser.lname}(${curUser.roll})`}
						</Typography>
						{/* course={course} */}
						{
							course ? (<></>) : (<AddCourse curUser={curUser} course={course} editCourse={false} />)
						}
					</Box>
					<Box
						width="100%"
						mt={3}
						p={3}
						pt={-1}
						color="green"

						sx={{
							bgcolor: "background.paper",
						}}
					>
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
													{curElem.week}
												</Typography>
											</Box>
										);
									})}
									{/* <EditCourse curUser={curUser} /> */}
									<Grid container width="100%">
										<Grid item xs={12}>
											<AddCourse
												curUser={curUser}
												editCourse={true}
												course={course}
											/>
											<Button onClick={() => history.push(`/classmaterials/${course?._id}`)}>Preview</Button>
										</Grid>
									</Grid>
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
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default CDTeacher;

