import React, { useState } from "react";
import UserSidebar from "./UserSidebar.js";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
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
      const attObj = { _id, year, month:11, date };
      console.log(date);
      const res = await axios.post("/user/attendance", attObj);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="parent">
        <UserSidebar />

        <div className="dashboard">
          <div className="sub_dash sub_dash_att">
            <div className="attendance_top">
              <h1>Check Today's Attendance</h1>
              {/* <div className="att_slide_div">
                <LinearProgress
                  sx={{ width: "80%", height: "30px" }}
                  color="success"
                  variant="determinate"
                  value={100}
                /> */}

              {todayAttend ? (
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
              )}
              {/* </div> */}
            </div>

            <div className="attendance_bot">
              <div className="attendance_bot_left"></div>
              <div className="attendance_bot_right"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Attendance;
