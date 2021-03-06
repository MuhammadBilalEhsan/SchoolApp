// import socketIO from "socket.io-client"
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Header from "./Header";
import { Box, Avatar, Grid, Paper, Typography } from "@mui/material";
import EditProfile from "./EditProfile";
import ChangeProfilePic from "./ChangeProfilePic";
import MuiSnacks from "./MuiSnacks"
// import Spinner from "./Spinner";
import "../App.css";
// import { socket } from "../App"
// import { useDispatch } from "react-redux";


const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body1,
	padding: theme.spacing(1.5),
	display: "flex",
	justifyContent: "space-between",
	color: "green",
}));
const Profile = ({ curUser, setAuth }) => {
	const [imgURL, setImgURL] = useState(curUser?.dp)
	const [openSnack, setOpenSnack] = useState("");
	const [severity, setSeverity] = useState("");
	const [currentUser, setCurrentUser] = useState(curUser);


	// useEffect(() => {
	// 	setImgURL(curUser?.dp)
	// })
	let { age, atClass, email, fatherName, fname, lname, phone, roll } = currentUser;
	return (
		<Box className={`_main`}>
			<Header curUser={curUser} setAuth={setAuth} />
			<Box
				mt={1}
				width="99%"
				display="flex"
				justifyContent="flex-end"
			>
				<EditProfile
					curUser={curUser}
					setSeverity={setSeverity}
					setOpenSnack={setOpenSnack}
					setCurrentUser={setCurrentUser}
				/>
			</Box>
			<Box width="100%" my="auto">

				{openSnack ? <MuiSnacks openSnack={openSnack} severity={severity} text={openSnack} setOpenSnack={setOpenSnack} /> : ""}

				<Box width="70%" mx="auto" display="flex" justifyContent="center" alignItems="center">
					<Avatar
						alt={`${fname} ${lname}`}
						src={imgURL}
						sx={{ width: "180px", height: "180px", border: "1px dashed green" }}
						mx="auto"
					/>
				</Box>
				<Box
					width="100%"
					display="flex"
					justifyContent="center"
					position="relative"
					bottom="13px"
					zIndex={1}
				>
					<ChangeProfilePic
						curUser={curUser}
						setImgURL={setImgURL}
						setSeverity={setSeverity}
						setOpenSnack={setOpenSnack}
					/>
				</Box>
				<Box maxWidth="900px" mx="auto" mt={3} px={5} position="relative" bottom="30px">
					<Grid container spacing={2} justifyContent="center">
						<Grid item xs={12} md={6}>
							<Item>
								<Box width="30%" color="black" textAlign="right">
									Name:
								</Box>
								<Box width="66%" textAlign="center">{`${fname} ${lname}`}</Box>
							</Item>
						</Grid>
						<Grid item xs={12} md={6}>
							<Item>
								<Box width="30%" color="black" textAlign="right">
									Email:
								</Box>
								<Box width="66%" textAlign="center">
									{email}
								</Box>
							</Item>
						</Grid>
						<Grid item xs={12} md={6}>
							<Item>
								<Box width="30%" color="black" textAlign="right">
									Class:
								</Box>
								<Box width="66%" textAlign="center">
									{
										atClass ? (
											atClass
										) : (
											<Typography variant="body1" color="success">
												not Provided
											</Typography>
										)
									}
								</Box>
							</Item>
						</Grid>
						<Grid item xs={12} md={6}>
							<Item>
								<Box width="30%" color="black" textAlign="right">
									Age:
								</Box>
								<Box width="66%" textAlign="center">
									{
										age ? (
											age
										) : (
											<Typography variant="body1" color="success">
												not Provided
											</Typography>
										)
									}
								</Box>
							</Item>
						</Grid>
						<Grid item xs={12} md={6}>
							<Item>
								<Box width="30%" color="black" textAlign="right">
									Son of:
								</Box>
								<Box width="66%" textAlign="center">
									{
										fatherName ? (
											fatherName
										) : (
											<Typography variant="body1" color="success">
												not Provided
											</Typography>
										)
									}
								</Box>
							</Item>
						</Grid>
						<Grid item xs={12} md={6}>
							<Item>
								<Box width="30%" color="black" textAlign="right">
									Contact:
								</Box>
								<Box width="66%" textAlign="center">
									{
										phone ? (
											phone
										) : (
											<Typography variant="body1" color="success">
												not Provided
											</Typography>
										)
									}
								</Box>
							</Item>
						</Grid>
						<Grid item xs={12} md={6} mb={2}>
							<Item>
								<Box width="30%" color="black" textAlign="right">
									Roll:
								</Box>
								<Box width="66%" textAlign="center">
									{roll}
								</Box>
							</Item>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Box>
	);
};

export default Profile;
