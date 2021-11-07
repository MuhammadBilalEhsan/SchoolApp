import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import CourseDetails from "./Pages/CourseDetails";
import Attendance from "./Pages/Attendance";
import Spinner from "./Pages/Spinner";
import ClassMaterials from "./Pages/ClassMaterials";
import { curUserFun, getUsers } from "./redux/actions/index";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase/firebaseConfig";
import axios from "axios";

import PrivateRoute from "./PrivateRoute";

function App() {
  initializeApp(firebaseConfig);

  const curUser = useSelector(state => state.usersReducer.curUser);

  const [uid, setUid] = useState(curUser._id);
  const [spinner, setSpinner] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/user/getdata")
      .then(response => {
        const data = response.data;
        const _id = localStorage.getItem("uid");
        const currentUser = data.find(user => user._id === _id);
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
      .catch(error => console.log(error));
  }, [dispatch]);
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
            path="/course-details"
            SuccessComp={<CourseDetails />}
            FailComp={<Redirect to="/" />}
          />
          <PrivateRoute
            auth={uid}
            path="/class-materials"
            SuccessComp={<ClassMaterials />}
            FailComp={<Redirect to="/" />}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
