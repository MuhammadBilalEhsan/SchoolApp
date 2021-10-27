import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import CourseDetails from "./Pages/CourseDetails";
import Attendance from "./Pages/Attendance";
import ClassMaterials from "./Pages/ClassMaterials";
import { getUsers } from "./redux/actions/index";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

// import PrivateRoute from "./PrivateRoute";

function App() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/user/getdata")
      .then(response => {
        const data = response.data;
        dispatch(getUsers(data));
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/course-details">
            <CourseDetails />
          </Route>
          <Route path="/attendance">
            <Attendance />
          </Route>
          <Route path="/class-materials">
            <ClassMaterials />
          </Route>
          {/* <PrivateRoute
            auth={true}
            exact
            path="/"
            SuccessComp={<Redirect to="/profile" />}
            FailComp={<Login />}
          />
          <PrivateRoute
            auth={true}
            exact
            path="/profile"
            SuccessComp={<Profile />}
            FailComp={<Redirect to="/" />}
          />
          <PrivateRoute
            auth={true}
            exact
            path="/attendance"
            SuccessComp={<Attendance />}
            FailComp={<Redirect to="/" />}
          />
          <PrivateRoute
            auth={true}
            exact
            path="/course-details"
            SuccessComp={<CourseDetails />}
            FailComp={<Redirect to="/" />}
          />
          <PrivateRoute
            auth={true}
            exact
            path="/class-materials"
            SuccessComp={<ClassMaterials />}
            FailComp={<Redirect to="/" />}
          /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
