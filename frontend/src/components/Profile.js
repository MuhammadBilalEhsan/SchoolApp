import React from "react";
// import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Header from "./Header";
import { Box, Avatar, Grid, Paper, Fab } from "@mui/material";
import img from "../images/img.jpg";
import EditProfile from "./EditProfile";
import ChangeProfilePic from "./ChangeProfilePic";
import "../App.css";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body1,
	padding: theme.spacing(1.5),
	display: "flex",
	justifyContent: "space-between",
	color: "green",
}));

// const useStyles = makeStyles((theme) => ({
	
// }));

const Profile = ({ curUser }) => {
	// const classes = useStyles();
	let { age, atClass, email, fatherName, fname, lname, phone, roll } = curUser;
	return (
		<>
			<Box className={`_main`}>
				<Header />
				<Box mt={5} width="100%">
					<Box width="70%" mx="auto">
						<Grid container spacing={2} justifyContent="center">
							<Avatar
								alt="Remy Sharp"
								src={img}
								sx={{ width: "300px", height: "300px" }}
								mx="auto"
							/>
						</Grid>
						<Grid
							container
							justifyContent="space-between"
							width="25%"
							mx="auto"
						>
							<ChangeProfilePic curUser={curUser} />
							<EditProfile curUser={curUser} />
						</Grid>
					</Box>
					<Box width="70%" mx="auto" mt={3}>
						<Grid container spacing={2} justifyContent="center">
							<Grid item xs={10} md={6}>
								<Item>
									<Box width="48%" textAlign="right">
										Name:
									</Box>
									<Box width="48%" textAlign="left">{`${fname} ${lname}`}</Box>
								</Item>
							</Grid>
							<Grid item xs={10} md={6}>
								<Item>
									<Box width="48%" textAlign="right">
										Email:
									</Box>
									<Box width="48%" textAlign="left">
										{email}
									</Box>
								</Item>
							</Grid>
							<Grid item xs={10} md={6}>
								<Item>
									<Box width="48%" textAlign="right">
										Class:
									</Box>
									<Box width="48%" textAlign="left">
										{atClass}
									</Box>
								</Item>
							</Grid>
							<Grid item xs={10} md={6}>
								<Item>
									<Box width="48%" textAlign="right">
										Age:
									</Box>
									<Box width="48%" textAlign="left">
										{age}
									</Box>
								</Item>
							</Grid>
							<Grid item xs={10} md={6}>
								<Item>
									<Box width="48%" textAlign="right">
										Son of:
									</Box>
									<Box width="48%" textAlign="left">
										{fatherName}
									</Box>
								</Item>
							</Grid>
							<Grid item xs={10} md={6}>
								<Item>
									<Box width="48%" textAlign="right">
										Contact:
									</Box>
									<Box width="48%" textAlign="left">
										{phone}
									</Box>
								</Item>
							</Grid>
							<Grid item xs={10} md={6} mb={2}>
								<Item>
									<Box width="48%" textAlign="right">
										Roll:
									</Box>
									<Box width="48%" textAlign="left">
										{roll}
									</Box>
								</Item>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Profile;
