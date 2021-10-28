import React, { useState } from "react";

import Fab from "@mui/material/Fab";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

const OpenEdit = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Fab
        size="small"
        sx={{
          backgroundColor: "#ff6600",
          position: "relative",
          left: "25%",
          bottom: "20%",
        }}
        // aria-label="edit"
        onClick={handleClickOpen}
      >
        <MdOutlineModeEditOutline color="white" size="22px" />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogContent>
        </DialogContent> */}
        <DialogActions>
          {/* <Button variant="contained" onClick={handleClose}>
            Save Edit
            </Button>
        <Button onClick={handleClose}>Cancel</Button> */}

          <List>
            <ListItem divider>
              <FaUserEdit color="blue" size="22px" />
              <input name="profile_pic" type="file" />
              {/* <Button onClick={handleClose}>Cancel</Button> */}
            </ListItem>
            <ListItem button divider>
              <ListItemText onClick={handleClose} primary="Edit Credentials" />
            </ListItem>
          </List>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OpenEdit;
