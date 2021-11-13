import React, { useState, useEffect } from "react";
import Spinner from "./components/Spinner";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Attendance from "./components/Attendance";
import CourseDetails from "./components/CourseDetails";
import ClassMaterials from "./components/ClassMaterials";
// import Contact from "./components/Contact";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { curUserFun, getUsers } from "./redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./App.css";

import PrivateRoute from "./PrivateRoute";

const App = () => {
	const curUser = useSelector((state) => state.usersReducer.curUser);

	const [uid, setUid] = useState(curUser._id);
	const [spinner, setSpinner] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.get("/user/getdata")
			.then((response) => {
				const data = response.data;
				const _id = localStorage.getItem("uid");
				const currentUser = data.find((user) => user._id === _id);
				if (currentUser) {
					dispatch(curUserFun(currentUser));
					setUid(true);
					setSpinner(false);
				} else {
					setSpinner(false);
					setUid(false);
				}
				dispatch(getUsers(data));
			})
			.catch((error) => console.log(error));
	}, []);
	if (spinner) return <Spinner />;
	return (
		<>
			<Router>
				<Switch>
					<PrivateRoute
						auth={uid}
						exact
						path="/"
						SuccessComp={<Redirect to="/profile" />}
						// SuccessComp={<Redirect to="/coursedetails" />}
						FailComp={<Login />}
					/>
					<PrivateRoute
						auth={uid}
						path="/profile"
						SuccessComp={<Profile curUser={curUser} />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={uid}
						path="/attendance"
						SuccessComp={<Attendance curUser={curUser} />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={uid}
						path="/coursedetails"
						SuccessComp={<CourseDetails curUser={curUser} />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={uid}
						path="/classmaterials"
						SuccessComp={<ClassMaterials />}
						FailComp={<Redirect to="/" />}
					/>
					{/* <PrivateRoute
						auth={uid}
						path="/contact"
						SuccessComp={<Contact />}
						FailComp={<Redirect to="/" />}
					/> */}
				</Switch>
			</Router>
		</>
	);
};

export default App;
