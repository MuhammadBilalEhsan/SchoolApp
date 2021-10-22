import "./App.css";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
// import Attendance from "./Pages/Attendance";
// import CourseDetails from "./Pages/CourseDetails";
// import ClassMaterials from "./Pages/ClassMaterials";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect,
} from "react-router-dom";

// import PrivateRoute from "./PrivateRoute";

function App() {
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
