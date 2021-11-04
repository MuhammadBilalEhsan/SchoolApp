import React, { useState, useEffect } from "react";
import UserSidebar from "./UserSidebar.js";
// import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment-business-days";
import "../css/attendance.css";
import axios from "axios";

const Attendance = ({ curUser }) => {
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
      const res = await axios.post("/user/attendance", attObj);
      console.log(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Your Attendance not marked");
    }
  };
  // const curUserAtt = curUser.attendance;
  // console.log(curUserAtt);
  // curUserAtt?.map(curElem => console.log(curElem));
  // console.log(curUserAtt[0].days.length);
  useEffect(() => {
    let m = moment();
    // let diff = moment("02-11-2021", "DD-MM-YYYY").businessDiff(
    //   moment("8-01-2021", "DD-MM-YYYY")
    // );
    console.log(m.isValid());
    // console.log(diff);
  }, []);

  return (
    <>
      <div className="parent">
        <UserSidebar />
        <div className="dashboard">
          <div className="sub_dash sub_dash_att">
            <div className="attendance_top">
              <Typography mt={8} mb={2} variant="h4">
                Mark Today's Attendance
              </Typography>

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
            </div>

            <div className="attendance_bot">
              <div className="attendance_bot_left">
                <h1>This Month</h1>
                <CircularProgress
                  color="success"
                  size="50%"
                  variant="determinate"
                  value={100}
                />
              </div>
              <div className="attendance_bot_right">
                <h1>Overall</h1>
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
