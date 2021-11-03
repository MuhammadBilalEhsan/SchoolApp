import React, { useState } from "react";
import UserSidebar from "./UserSidebar.js";
// import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import "../css/attendance.css";
import axios from "axios";

const Attendance = () => {
  const [todayAttend, setTodayAttend] = useState(null);

  const _id = localStorage.getItem("uid");

  const handleClick = async e => {
    try {
      e.preventDefault();
      setTodayAttend(true);
      const att = new Date();
      const year = att.getFullYear();
      const month = att.getMonth();
      const date = att.getDate();
      const attObj = { _id, year, month, date };
      await axios.post("/user/attendance", attObj);
    } catch (err) {
      console.error(err);
    }
  };
  const handleCheck = async e => {
    try {
      console.log("Testing...");
      await axios.post("/user/test");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="parent">
        <UserSidebar />
        <div className="dashboard">
          <div className="sub_dash sub_dash_att">
            <div className="attendance_top">
              <Typography mt={2} mb={2} variant="h4">
                Mark Today's Attendance
              </Typography>
              {/* <h1>Mark Today's Attendance</h1> */}

              {/* {todayAttend ? (
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  disabled
                >
                  Check In
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={e => handleClick(e)}
                >
                  Check In
                </Button>
              )} */}
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={e => handleCheck(e)}
              >
                Testing
              </Button>
            </div>

            <div className="attendance_bot">
              <div className="attendance_bot_left">
                <CircularProgress
                  color="success"
                  size="50%"
                  variant="determinate"
                  value={100}
                />
              </div>
              <div className="attendance_bot_right">
                <CircularProgress
                  color="success"
                  size="50%"
                  variant="determinate"
                  value={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Attendance;
