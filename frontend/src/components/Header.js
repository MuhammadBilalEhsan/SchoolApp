import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Tooltip
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { CgMoreVerticalR, CgLogOff } from "react-icons/cg";

import { Link } from "react-router-dom";
const BtnBox = styled("div")(({ theme }) => ({
	padding: theme.spacing(1),
	display: "none",
	[theme.breakpoints.up("md")]: {
		display: "flex",
	},
}));
const MobMenuComp = styled("div")(({ theme }) => ({
	// padding: theme.spacing(1),
	display: "none",
	[theme.breakpoints.down("md")]: {
		display: "flex",
	},
}));
const useStyles = makeStyles((theme) => ({}));
const Header = () => {
	const classes = useStyles();
	const [mobMenuAnchor, setMobMenuAnchor] = useState(null);
	const isMobMenuOpen = Boolean(mobMenuAnchor);

	const history = useHistory();

	const openMobMenu = (e) => {
		setMobMenuAnchor(e.currentTarget);
	};
	const closeMobMenu = () => {
		setMobMenuAnchor(null);
	};
	const mobileMenu = (
		<Menu
			anchorEl={mobMenuAnchor}
			id="mob_menu"
			keepMounted
			open={isMobMenuOpen}
		>
			<MenuItem
				component={Link}
				to="/profile"
				sx={{
					backgroundColor: "green",
					color: "#fff",
					width: "100vw",
					justifyContent: "center",
					paddingBottom: 2,
				}}
			>
				Profile
			</MenuItem>
			<MenuItem
				component={Link}
				to="/attendance"
				sx={{
					backgroundColor: "green",
					color: "#fff",
					width: "100vw",
					justifyContent: "center",
					paddingBottom: 2,
				}}
			>
				Attendance
			</MenuItem>
			<MenuItem
				component={Link}
				to="/coursedetails"
				sx={{
					backgroundColor: "green",
					color: "#fff",
					width: "100vw",
					justifyContent: "center",
					paddingBottom: 2,
				}}
			>
				Course Details
			</MenuItem>
			<MenuItem
				component={Link}
				to="/classmaterials"
				sx={{
					backgroundColor: "green",
					color: "#fff",
					width: "100vw",
					justifyContent: "center",
					paddingBottom: 2,
				}}
			>
				Class Materials
			</MenuItem>
			<MenuItem
				component={Button}
				onClick={() => {
					localStorage.removeItem("uid");
					history.push("/");
				}}
				sx={{
					backgroundColor: "green",
					color: "red",
					width: "100vw",
					justifyContent: "center",
					paddingBottom: 2,
				}}
			>
				Log Out
			</MenuItem>
		</Menu>
	);
	return (
		<>
			<AppBar color="success" position="static">
				<Toolbar>
					<Typography variant="h5" sx={{ flexGrow: 1 }}>
						BE School
					</Typography>
					<BtnBox>
						<Button component={Link} to="/profile" size="small" color="inherit">
							Profile
						</Button>
						<Button
							component={Link}
							to="/attendance"
							size="small"
							color="inherit"
							sx={{ marginLeft: 3 }}
						>
							Attendance
						</Button>
						<Button
							component={Link}
							to="/coursedetails"
							size="small"
							color="inherit"
							sx={{ marginLeft: 3 }}
						>
							Course Details
						</Button>
						<Button
							component={Link}
							to="/classmaterials"
							size="small"
							color="inherit"
							sx={{ marginLeft: 3 }}
						>
							Class Materials
						</Button>
						{/* <Button
							component={Link}
							to="/contact"
							size="small"
							color="inherit"
							sx={{ marginLeft: 3 }}
						>
							Contact Us
						</Button> */}
						<Tooltip title="Log Out" arrow>
							<Button
								// size="small"
								color="error"
								sx={{ marginLeft: 3 }}
								onClick={() => {
									localStorage.removeItem("uid");
									history.push("/");
								}}
							>
								<CgLogOff size="25px" />
							</Button>
						</Tooltip>
					</BtnBox>
					<MobMenuComp>
						<IconButton color="inherit" onClick={openMobMenu}>
							<CgMoreVerticalR />
						</IconButton>
					</MobMenuComp>
				</Toolbar>
			</AppBar>
			{mobileMenu}
		</>
	);
};

export default Header;
