import React, { useState, useEffect } from "react";
import Spinner from "./components/Spinner";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Attendance from "./components/Attendance";
import CourseDetails from "./components/CourseDetails";
import ClassMaterials from "./components/ClassMaterials";
import EnrollCoursePreview from "./components/EnrollCoursePreview";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { curUserFun, getUsers, getCourseFunc, getStudentCourseFunc } from "./redux/actions/index";
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
				if (!currentUser) {
					setSpinner(false);
					setUid(false);
				} else {
					dispatch(curUserFun(currentUser));
					if (currentUser.roll === "teacher") {
						axios.post("course/mycourse", { teacher_id: currentUser._id })
							.then((resp) => {
								const course = resp.data.course;
								dispatch(getCourseFunc(course))
							}).catch(err => console.log(err))
					}
					if (currentUser.roll === "student" && currentUser.atClass) {
						axios.post("course/forstudent", { studentClass: currentUser.atClass, studentID: _id })
							.then((resp) => {
								const courses = resp.data.courses;
								dispatch(getStudentCourseFunc(courses))
							}).catch(err => console.log(err))
					}
					setUid(true);
					setSpinner(false);
				}
				// dispatch(getUsers(data));
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
					{
						curUser?.roll === "teacher" ? (
							<PrivateRoute
								auth={uid}
								path="/classmaterials"
								SuccessComp={<ClassMaterials curUser={curUser} />}
								FailComp={<Redirect to="/" />}
							/>
						) : (
							""
						)
					}
					<PrivateRoute
						auth={uid}
						path="/course/:id"
						SuccessComp={<EnrollCoursePreview curUser={curUser} />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={uid}
						path="/*"
						SuccessComp={<Redirect to="/profile" />}
						FailComp={<Redirect to="/" />}
					/>
				</Switch>
			</Router>
		</>
	);
};

export default App;
