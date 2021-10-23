import React, { useEffect } from "react";
import UserSidebar from "./UserSidebar.js";
import { useSelector } from "react-redux";

const Profile = () => {
  // const users = useSelector(state => state.usersReducer.users);
  // const curUser = useSelector(state => state.usersReducer.curUser);

  // const teachers = users.filter(curElem => curElem.roll === "teacher");
  // const students = users.filter(curElem => curElem.roll === "student");

  const curUser = useSelector(state => state.usersReducer.curUser);
    console.log(curUser);
 ;

  return (
    <>
      <div className="parent">
        <UserSidebar />
        <div className="dashboard">
          <div className="sub_dash sub_dash_pro"></div>
        </div>
      </div>
    </>
  );
};
export default Profile;
