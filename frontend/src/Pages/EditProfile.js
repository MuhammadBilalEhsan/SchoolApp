import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FaUserEdit } from "react-icons/fa";
import axios from "axios";
// useformik
export default function EditProfile({uid}) {
  const [updateProf, setUpdatProf] = useState({
    id: uid,
    fname: "",
    lname: "",
    fatherName: "",
    atClass: "",
    age: "",
    phone: "",
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let name, value;
  const handleChange = e => {
    name = e.target.name;
    value = e.target.value;
    setUpdatProf({ ...updateProf, [name]: value });
  };
  const submitUpdate = async e => {
    e.preventDefault();
    console.log(updateProf)
    let { id, fname, lname, fatherName, atClass, age, phone } = updateProf;
    try {

      if (
        !id ||
        !fname ||
        !lname ||
        !fatherName ||
        !atClass ||
        !age ||
        !phone
      ) {
        alert("Please fill all fields properly");
      } else {
        const res = await axios.post("user/edit-profile", updateProf);
        if (res.data.message) {
          alert(res.data.message);
          handleClose();
        } else {
          alert("User not update!");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button variant="contained" color="warning" onClick={handleClickOpen}>
        <FaUserEdit color="white" size="24px" />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle align="center" backgroundColor="white">
          Edit Profile
        </DialogTitle>
        <DialogContent sx={{ justifyContent: "space-evenly" }}>
          {/* <DialogContentText>Please Edit Your Info here</DialogContentText> */}
          <TextField
            required
            autoFocus
            margin="dense"
            name="fname"
            label="First Name"
            type="text"
            variant="outlined"
            onChange={e => handleChange(e)}
            autoComplete="off"
            fullWidth
          />
          <TextField
            margin="dense"
            name="lname"
            label="Last Name"
            type="text"
            variant="outlined"
            onChange={e => handleChange(e)}
            autoComplete="off"
            fullWidth
          />
          <TextField
            margin="dense"
            name="fatherName"
            label="Son of"
            type="text"
            variant="outlined"
            onChange={e => handleChange(e)}
            autoComplete="off"
            fullWidth
          />
          <TextField
            margin="dense"
            name="atClass"
            label="In Class"
            type="number"
            variant="outlined"
            onChange={e => handleChange(e)}
            autoComplete="off"
            fullWidth
          />
          <TextField
            margin="dense"
            name="age"
            label="Age"
            type="number"
            variant="outlined"
            onChange={e => handleChange(e)}
            autoComplete="off"
            fullWidth
          />
          <TextField
            margin="dense"
            name="phone"
            label="Contact No..."
            type="number"
            variant="outlined"
            onChange={e => handleChange(e)}
            autoComplete="off"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={e => submitUpdate(e)}>
            Save Edit
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
