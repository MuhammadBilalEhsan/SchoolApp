import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Spinner from "./Spinner";
import "../css/login.css";

const Login = () => {
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

	const changeHistory = () => {
		history.push("/profile");
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoader(true);

		let { email, password } = loginData;
		if (!email) {
			alert("Please Enter The Correct Email!");
		} else if (!password || password.length < 8) {
			alert("Password! contains at least 8 characters !");
		} else {
			axios
				.post("user/login", loginData)
				.then((res) => {
					localStorage.setItem("uid", res.data.curUser._id);
					setLoader(false);
					changeHistory()
				})
				.catch((err) => {
					alert("Invalid Credentials");
					setLoader(false);
				});
		}
	};

	if (loader) return <Spinner />;
	return (
		<>
			<div className="container">
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
			</div>
		</>
	);
};

export default Login;
