import React, { useEffect } from "react";
import UserSidebar from "./UserSidebar.js";
import { useSelector } from "react-redux";
import { GiRank3 } from "react-icons/gi";
import { AiFillCamera } from "react-icons/ai";
// import { GrEdit } from "react-icons/gr";
import Typography from "@mui/material/Typography";
import EditProfile from "./EditProfile";
import "../css/profile.css";

const Profile = () => {
  // const users = useSelector(state => state.usersReducer.users);
  // const curUser = useSelector(state => state.usersReducer.curUser);

  // const teachers = users.filter(curElem => curElem.roll === "teacher");
  // const students = users.filter(curElem => curElem.roll === "student");

  const curUser = useSelector(state => state.usersReducer.curUser);
  console.log(curUser);
  return (
    <>
      <div className="parent">
        <UserSidebar />
        <div className="dashboard">
          <div className="sub_dash sub_dash_pro">
            <div className="pro-header">
              <button id="record">
                <GiRank3 /> &nbsp; Records
              </button>
              <div className="img-div">
                <img id="pro-img" src={`images/user.jpg`} alt="Profile_Pic" />
                <button id="edit_img">
                  <AiFillCamera size="20px" color="blue" />
                </button>
              </div>
              <button id="edit_prof">
                
                <EditProfile />
              </button>
            </div>
            <div className="sub_dash_bot">
              <Typography variant="h5">Bilal</Typography>
              
              {/* <h2>Muhamnmad Bilal Ehsan</h2>

              <h2>bilal@bilal.com</h2>

              <h2>Teacher</h2>

              <h2>03452969808</h2> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
