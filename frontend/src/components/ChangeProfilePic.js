import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Fab,
} from "@mui/material/";
import { BsCameraFill } from "react-icons/bs";
import axios from "axios";

// useformik

export default function ChangeProfilePic({ curUser }) {
	const [open, setOpen] = useState(false);
	const [imgObj, setImgObj] = useState(null);
	const uidFromLocalStorage = localStorage.getItem("uid");
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = async (e) => {
		e.preventDefault();
		try {
			const imgObj = e.target.files[0];

			let formData = new FormData();
			formData.append("_id", uidFromLocalStorage);
			formData.append("myImg", JSON.stringify(imgObj));
			console.log(formData);
			const config = {
				headers: { "content-type": "multipart/form-data" },
			};
			const res = await axios.post("/user/editprofileimg", formData, config);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	// const saveImg = async () => {
	// 	try {
	// 		console.log(imgObj);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	return (
		<div>
			<Fab
				sx={{ color: "#fff", backgroundColor: "#ff5100" }}
				size="small"
				onClick={handleClickOpen}
			>
				<BsCameraFill size="18px" />
			</Fab>
			{/* Openning Dialouge Box */}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle align="center" backgroundColor="white">
					Edit Picture
				</DialogTitle>
				<DialogContent>
					<form method="POST" encType="multipart/form-data">
						<input name="myImg" type="file" onChange={(e) => handleChange(e)} />
					</form>
				</DialogContent>
				<DialogActions>
					{/* <Button color="success" variant="contained" onClick={saveImg}>
						Save Edit
					</Button> */}

					<Button color="success" onClick={handleClose}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
