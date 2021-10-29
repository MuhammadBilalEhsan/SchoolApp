import React from "react";
import UserSidebar from "./UserSidebar.js";
import { GiRank3 } from "react-icons/gi";
import { CgLogOff } from "react-icons/cg";
import { useHistory } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import "../css/profile.css";
import EditProfileFormik from "./EditProfileFormik.js";
import ChangeProfilePic from "./ChangeProfilePic";

const Profile = ({ uid, curUser }) => {
  const history = useHistory();

  let { age, atClass, email, fatherName, fname, lname, phone, roll } = curUser;

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
              <ChangeProfilePic />
              <div className="edit_pro_btn">
                <EditProfileFormik />
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
            </div>
            <Button
              mt={5}
              color="error"
              onClick={() => {
                localStorage.removeItem("uid");
                history.push("/");
              }}
              variant="contained"
            >
              <CgLogOff /> &nbsp; Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
