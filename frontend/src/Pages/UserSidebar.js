import React from "react";
import "../css/userSidebar.css";
import { FaUserAlt, FaTasks } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { GiMaterialsScience } from "react-icons/gi";
import { useHistory } from "react-router-dom";

const UserSidebar = () => {
  const history = useHistory();
  return (
    <>
      <div id="side_bar">
        <div
          onClick={() => history.push("/profile")}
          className="side_bar_child"
          id="side_bar_profile"
        >
          <h1 style={{ color: "blue" }}>Profile</h1>
          <FaUserAlt color="blue" size="30%" />
        </div>

        <div
          onClick={() => history.push("/course-details")}
          className="side_bar_child"
          id="side_bar_cdetails"
        >
          <h1 style={{ color: "red" }}>Course Details</h1>
          <ImBooks color="red" size="30%" />
        </div>

        <div
          onClick={() => history.push("/attendance")}
          className="side_bar_child"
          id="side_bar_attendance"
        >
          <h1 style={{ color: "green" }}>Attendance</h1>
          <FaTasks color="green" size="30%" />
        </div>

        <div
          onClick={() => history.push("/class-materials")}
          className="side_bar_child"
          id="side_bar_cmaterials"
        >
          <h1 style={{ color: "purple" }}>Class Materials</h1>
          <GiMaterialsScience color="purple" size="30%" />
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
