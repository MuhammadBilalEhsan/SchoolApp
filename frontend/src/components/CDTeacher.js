import React from "react";
import { Box, Typography, Chip, Grid, Button, Tooltip } from "@mui/material";
import Header from "./Header";
import AddCourse from "./AddCourse";
import { useHistory } from "react-router-dom";
import { VscGoToFile } from "react-icons/vsc"


const CDTeacher = ({ curUser, course, setAuth }) => {

	let { courseName, courseDesc, topics, duration, courseOutline } =
		course || {};

	const history = useHistory()
	return (
		<>
			<Box className={`_main`}>
				<Header curUser={curUser} setAuth={setAuth} />
				<Box width="95%" maxWidth="1100px" marginX="auto">
					<Box display="flex" justifyContent="space-around" mt={3}>
						<Typography variant="h4" sx={{ textTransform: "capitalize" }}>
							{`${curUser.fname} ${curUser.lname}(${curUser.roll})`}
						</Typography>
						{/* course={course} */}
						{
							course ? ("") : (<AddCourse curUser={curUser} course={course} editCourse={false} />)
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
							<>
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
									</Grid>

								</Grid>
								<Box width="100%" display="flex" justifyContent="flex-end">
									<AddCourse
										curUser={curUser}
										editCourse={true}
										course={course}
									/>
									<Tooltip title="Go to This Course" arrow>
										<Button size="small" sx={{ borderRadius: 5 }} onClick={() => history.push(`/${course?._id}`)}><VscGoToFile size="22px" color="green" /></Button>
									</Tooltip>
								</Box>
							</>
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

