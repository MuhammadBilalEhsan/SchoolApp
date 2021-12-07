import socketIO from "socket.io-client"
import React, { useState, useEffect } from "react";
import Spinner from "./components/Spinner";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Attendance from "./components/Attendance";
import CourseDetails from "./components/CourseDetails";
import ClassMaterials from "./components/ClassMaterials";
import MessagesComp from "./components/MessagesComp";
import { BrowserRouter as Router, Switch, Redirect, useHistory } from "react-router-dom";
import { curUserFun,/* getUsers,*/ getCourseFunc, getStudentCourseFunc } from "./redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./App.css";

import PrivateRoute from "./PrivateRoute";

const ENDPOINT = "http://localhost:4040"
const socket = socketIO(ENDPOINT, { transports: ["websocket"] })
const App = () => {

	const [auth, setAuth] = useState(null)
	const _id = localStorage.getItem("uid");
	const history = useHistory()
	// 	const currentUserID = localStorage.getItem("uid");
	// 	if (currentUserID){
	// console.log
	// 	}
	socket.on("connect", () => {
		console.log("New Connection In Frontend...")
	})


	const curUser = useSelector((state) => state.usersReducer.curUser);
	const [uid, setUid] = useState(_id || curUser._id);
	const [spinner, setSpinner] = useState(false);

	const dispatch = useDispatch();
	useEffect(() => {
		if (!auth && !uid) {
			// setAuth(false)
			// setUid(false)
			// history.push("/")
			console.log("please create LogOut Function")
		}
		if (uid || auth) {
			setAuth(true)
			setSpinner(false)
			axios
				.get("/user/getdata")
				.then((response) => {
					const data = response.data;
					// console.log("data", response)
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
		}
	}, [auth]);

	if (spinner) return <Spinner />;
	return (
		<>
			<Router>
				<Switch>
					<PrivateRoute
						auth={auth}
						exact
						path="/"
						SuccessComp={<Redirect to="/profile" curUser={curUser} setAuth={setAuth} />}
						FailComp={<Login setAuth={setAuth} />}
					/>
					<PrivateRoute
						auth={auth}
						path="/profile"
						SuccessComp={<Profile curUser={curUser} setAuth={setAuth} />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						path="/attendance"
						SuccessComp={<Attendance curUser={curUser} setAuth={setAuth} />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						path="/coursedetails"
						SuccessComp={<CourseDetails curUser={curUser} setAuth={setAuth} />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						path="/messages"
						SuccessComp={<MessagesComp curUser={curUser} setAuth={setAuth} />}
						FailComp={<Redirect to="/" />}
					/>
					<PrivateRoute
						auth={auth}
						path="/classmaterials"
						SuccessComp={<Redirect to="/profile" curUser={curUser} />}
						FailComp={<Redirect to="/" />}
					/>

					{/* <PrivateRoute
						auth={auth}
						path="/logout"
						SuccessComp={<Redirect to="/" />}
						FailComp={<Redirect to="/" />}
					/> */}

					<PrivateRoute
						auth={auth}
						path="/:id"
						SuccessComp={<ClassMaterials curUser={curUser} setAuth={setAuth} />}
						FailComp={<Redirect to="/" />}
					/>

					<PrivateRoute
						auth={auth}
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
