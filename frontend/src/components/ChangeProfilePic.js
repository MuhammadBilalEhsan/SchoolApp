import React, { useState } from "react";
import "../App.css"
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Box,
	Tooltip
} from "@mui/material/";
import { BsCameraFill } from "react-icons/bs";
import axios from "axios";

export default function ChangeProfilePic({ curUser, setImgURL }) {
	const [open, setOpen] = useState(false);
	const [imgObj, setImgObj] = useState(null);
	const uidFromLocalStorage = localStorage.getItem("uid");
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};


	const saveImg = async (e) => {
		e.preventDefault()
		try {
			let formData = new FormData();
			formData.append("_id", uidFromLocalStorage);
			formData.append("myImg", imgObj);
			const config = {
				headers: { "content-type": "multipart/form-data" },
			};
			const res = await axios.post("/user/editprofileimg", formData, config);
			alert(res.data.message);
			setImgURL(res.data.pPic.dp)
			handleClose()
		} catch (err) {
			console.log(err);
			handleClose()
		}
	};

	return (
		<div>
			<Tooltip title="Edit Profile Picture" arrow>
				<Box>
					<BsCameraFill style={{ cursor: "pointer" }} onClick={handleClickOpen} size="20px" color="green" height="100%" />
				</Box>
			</Tooltip>

			{/* Openning Dialouge Box */}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle align="center" backgroundColor="white">
					Edit Picture
				</DialogTitle>
				<DialogContent>
					<form method="POST">
						<input name="myImg" type="file" accept="image/png, image/jpeg" onChange={(e) => setImgObj(e.target.files[0])} />
					</form>
				</DialogContent>
				<DialogActions>
					<Button color="success" variant="contained" onClick={saveImg}>
						save image
					</Button>

					<Button color="success" onClick={handleClose}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
