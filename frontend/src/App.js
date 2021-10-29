import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import CourseDetails from "./Pages/CourseDetails";
import Attendance from "./Pages/Attendance";
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
  const users = useSelector(state => state.usersReducer.users);
  const curUser = useSelector(state => state.usersReducer.curUser);

  const [uid, setUid] = useState(curUser._id);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/user/getdata")
      .then(response => {
        const data = response.data;
        dispatch(getUsers(data));
      })
      .catch(error => console.log(error));

    const uid = localStorage.getItem("uid");
    const me = users.find(user => user._id === uid);
    if (uid === "") {
      setUid(false);
    } else {
      setUid(uid);
    }
    if (me) {
      dispatch(curUserFun(me));
    }
  }, [users, dispatch]);
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
            SuccessComp={<Attendance />}
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
