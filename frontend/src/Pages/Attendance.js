import React, { useEffect, useState } from "react";
import UserSidebar from "./UserSidebar.js";
import Checkbox from "@mui/material/Checkbox";

const Attendance = () => {
  const [todayAttend, setTodayAttend] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setTodayAttend(true);
    console.log(todayAttend);
  };

  return (
    <>
      <div className="parent">
        <UserSidebar />

        <div className="dashboard">
          <div className="sub_dash sub_dash_att">
            <div className="attendance_top">
              <h1>Check Today's Attendance</h1>

              {todayAttend ? (
                <Checkbox size="large" disabled checked />
              ) : (
                <Checkbox
                  size="large"
                  color="success"
                  onChange={(e) => handleChange(e)}
                />
              )}
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
