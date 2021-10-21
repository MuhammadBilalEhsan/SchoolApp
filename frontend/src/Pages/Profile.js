import React from "react";
import "../css/user.css";
import { FaUserAlt } from "react-icons/fa";

const Profile = () => {
  return (
    <>
      <div id="side_bar">
        <div className="side_bar_child">
          <h1>Profile</h1>
          <FaUserAlt size="30%" />
        </div>
        <div className="side_bar_child">
          <h1>Course Details</h1>
          <FaUserAlt size="30%" />
        </div>
        <div className="side_bar_child">
          <h1>Attendance</h1>
          <FaUserAlt size="30%" />
        </div>
        <div className="side_bar_child">
          <h1>Class Materials</h1>
          <FaUserAlt size="30%" />
        </div>
      </div>
    </>
  );
};

export default Profile;
