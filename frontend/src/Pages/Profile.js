// import React, { useState, useEffect } from "react";
import UserSidebar from "./UserSidebar.js";
import { useSelector, useDispatch } from "react-redux";
import { GiRank3 } from "react-icons/gi";
import { AiFillCamera } from "react-icons/ai";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import EditProfile from "./EditProfile";
import { curUserFun } from "../redux/actions/index";
import "../css/profile.css";
const uid = localStorage.getItem("uid");

const Profile = () => {
  const users = useSelector(state => state.usersReducer.users);
  const dispatch = useDispatch();

  const me = users.find(user => user._id === uid);
  if (me) {
    dispatch(curUserFun(me));
  }

  const curUser = useSelector(state => state.usersReducer.curUser);
  let { age, atClass, email, fatherName, fname, lname, phone, roll } = curUser;
  // console.log(curUser);

  // const teachers = users.filter(curElem => curElem.roll === "teacher");
  // const students = users.filter(curElem => curElem.roll === "student");

  // const me = useSelector(state => state.usersReducer.curUser);

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
              <div className="edit_pro_btn">
                <EditProfile uid={curUser.id} />
              </div>
            </div>
            <div className="sub_dash_bot">
              <div>
                <List>
                  <ListItem button>
                    <ListItemText primary="Name :" />
                  </ListItem>
                  <Divider />
                  <ListItem button divider>
                    <ListItemText primary="Age :" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Father Name :" />
                  </ListItem>
                  <Divider light />
                  <ListItem button divider>
                    <ListItemText primary="Class :" />
                  </ListItem>
                  <ListItem button divider>
                    <ListItemText primary="Email :" />
                  </ListItem>
                  <ListItem button divider>
                    <ListItemText primary="Contact No. :" />
                  </ListItem>
                  <ListItem button divider>
                    <ListItemText primary="Roll :" />
                  </ListItem>
                </List>
              </div>
              <div>
                <List>
                  <ListItem button>
                    <ListItemText primary={`${fname} ${lname}`} />
                  </ListItem>
                  <Divider />
                  <ListItem button divider>
                    <ListItemText primary={age} />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary={fatherName} />
                  </ListItem>
                  <Divider light />
                  <ListItem button divider>
                    <ListItemText primary={atClass} />
                  </ListItem>
                  <ListItem button divider>
                    <ListItemText primary={email} />
                  </ListItem>
                  <ListItem button divider>
                    <ListItemText primary={phone} />
                  </ListItem>
                  <ListItem button divider>
                    <ListItemText primary={roll} />
                  </ListItem>
                </List>
              </div>
              {/* <Typography variant="h5">{fname}</Typography>
              <Typography variant="h5">{lname}</Typography>
              <Typography variant="h5">{age}</Typography>
              <Typography variant="h5">{email}</Typography>
              <Typography variant="h5">{fatherName}</Typography>
              <Typography variant="h5">{phone}</Typography>
              <Typography variant="h5">{roll}</Typography>
              <Typography variant="h5">{atClass}</Typography> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
