import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography, Divider } from "@mui/material"
import { CgProfile } from "react-icons/cg";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiLogIn } from "react-icons/fi";
import Spinner from "./Spinner";
import "../css/login.css";

const Login = ({ setAuth }) => {
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});
	const [loader, setLoader] = useState(false);

	const history = useHistory();
	let name, value;
	const handleChange = (e) => {
		name = e.target.name;
		value = e.target.value;
		setLoginData({ ...loginData, [name]: value });
	};


	const handleSubmit = (e) => {
		e.preventDefault();
		setLoader(true);

		let { email, password } = loginData;
		if (!email) {
			alert("Please Enter The Correct Email!");
			setLoader(false);
		} else if (!password || password.length < 8) {
			alert("Password! contains at least 8 characters !");
			setLoader(false);
		} else {
			axios
				.post("user/login", loginData)
				.then((res) => {
					localStorage.setItem("uid", res.data.curUser._id);
					setLoader(false);
					setAuth(true)
					history.push("/profile");
				})
				.catch((err) => {
					setLoader(false);
					alert("Invalid Credentials");
				});
		}
	};

	if (loader) return <Spinner />;
	return (
		<Box className={`_main`} display="flex" alignItems="center">
			<Box sx={{ backgroundColor: "#fff" }} maxWidth="400px" borderRadius={1} boxShadow={3} mx="auto" p={4} pt={2} display="flex" justifyContent="center" alignItems="center">
				<form method="POST" onSubmit={(e) => handleSubmit(e)} style={{ textAlign: "center" }}>
					<Typography variant="h6" textAlign="center"> CY School App
						<Divider sx={{ marginBottom: 2 }} />
					</Typography>
					<FaUserAlt className="large-icon" color="green" size="50%" />
					<TextField
						autoFocus
						margin="dense"
						name="email"
						label="Your Email"
						type="email"
						variant="outlined"
						value={loginData.email}
						onChange={(e) => handleChange(e)}
						autoComplete="off"
						fullWidth
						color={"success"}
						inputProps={{ maxLength: 32 }}
					/>
					<TextField
						margin="dense"
						name="password"
						label="Your Password"
						type="password"
						variant="outlined"
						value={loginData.password}
						onChange={(e) => handleChange(e)}
						autoComplete="off"
						fullWidth
						color={"success"}
						inputProps={{ maxLength: 32 }}
						sx={{ marginBottom: 2 }}
					/>
					<Button size="large" type="submit" mt={2} variant="contained" color="success" startIcon={<FiLogIn size="22px" color="#fff" />} fullWidth>LOGIN</Button>
				</form>
			</Box>
		</Box>
	);
};

export default Login;

{/* <div className="container">
	<div className="subContainer">
		<form method="POST" onSubmit={(e) => handleSubmit(e)}>
			<FaUserAlt className="large-icon" color="#fa5bface" size="35%" />

			<div className="label">
				<CgProfile className="small-icons" color="#fff" size="32px" />
				<input
					type="email"
					maxLength="64"
					name="email"
					className="inp"
					value={loginData.email}
					placeholder="Your Email"
					onChange={(e) => handleChange(e)}
					required
					autoComplete="off"
					autoFocus
				/>
			</div>
			<div className="label">
				<RiLockPasswordFill
					className="small-icons"
					color="#fff"
					size="32px"
				/>
				<input
					type="password"
					maxLength="32"
					name="password"
					className="inp"
					value={loginData.password}
					placeholder="Password"
					onChange={(e) => handleChange(e)}
					required
					autoComplete="off"
				/>
			</div>
			<br />
			<input
				className="btn btn-submit"
				type="submit"
				value="LOGIN"
			/>
		</form>
	</div>
</div> */}
