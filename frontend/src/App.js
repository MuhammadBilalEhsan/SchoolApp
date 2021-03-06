import socketIO from 'socket.io-client';
import React, { useState, useEffect } from "react";
import Spinner from "./components/Spinner";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Attendance from "./components/Attendance";
import CourseDetails from "./components/CourseDetails";
import ClassMaterials from "./components/ClassMaterials";
import MessagesComp from "./components/MessagesComp";
import PrivateConversation from "./components/PrivateConversation";
import appSetting from "./appSetting/appSetting"
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import {
	curUserFun,/* getUsers,*/ getCourseFunc, getStudentCourseFunc, updateCourses,
	updateCurrentCourse, updateAllAssignments, editAvailAbleCourses
} from "./redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./App.css";

import PrivateRoute from "./PrivateRoute";

const ENDPOINT = appSetting.severHostedUrl
export const socket = socketIO(ENDPOINT, { transports: ["websocket"] })
const App = () => {
	// let socket = io(appSetting.severHostedUrl);
	const [auth, setAuth] = useState(null)
	const _id = localStorage.getItem("uid");

	const curUser = useSelector((state) => state.usersReducer.curUser);
	const [uid, setUid] = useState(_id || curUser._id);
	const [spinner, setSpinner] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!auth && !uid) {
			// setAuth(false)
			setSpinner(false)
			console.log("please create LogOut Function")
		}
		if (uid || auth) {
			setSpinner(true)
			setAuth(true)
			var currentUser;
			axios
				.get("/user/getdata")
				.then((response) => {
					const data = response.data;
					// console.log("data", response)
					currentUser = data.find((user) => user._id === _id);
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
			socket.on("connect", () => {
				// console.log("Backend Connected..!!")
			})
			socket.on("courseADDEDByTeacher", (newCourse) => {
				if (currentUser?.roll === "student" && currentUser?.atClass == newCourse?.teacherClass) {
					dispatch(editAvailAbleCourses(newCourse))
				}
			})

			// socket.on("ENROLLEDiNcOURSE", (course) => {
			// 	if (currentUser?._id === course.teacher_id) {
			// 		console.log("enrolled")
			// 		dispatch(getCourseFunc(course))
			// 	} else { console.log("not Enrolled") }
			// 	console.log("course", course)
			// })
			socket.on("courseEditedByTeacher", (course) => {
				if (currentUser?.roll === "student" && currentUser?.atClass == course?.teacherClass) {
					dispatch(updateCourses(course))
				}
			})
			socket.on("messageAddedStream", (course) => {
				dispatch(updateCurrentCourse(course))
			})
			socket.on("ASSIGNMENT_ADDED", (allAssignment) => {
				dispatch(updateAllAssignments(allAssignment))
			})
		}
		// setSpinner(false)
	}, [auth, ENDPOINT]);
	// useEffect(() => {
	// 	socket.on("COURSE_EDITTED", () => {
	// 		console.log("abc")
	// 	})
	// }, [uid])



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
					{/* <PrivateRoute
						auth={auth}
						path="/messages/:id"
						SuccessComp={<PrivateConversation curUser={curUser} setAuth={setAuth} />}
						FailComp={<Redirect to="/" />}
					/> */}
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
