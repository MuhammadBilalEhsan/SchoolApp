import React, { useState } from "react";
import {
	Fab,
	DialogTitle,
	DialogContent,
	DialogActions,
	Dialog,
	TextField,
	Button,
} from "@mui/material/";
import { FaUserEdit } from "react-icons/fa";
// import { Field, Form, Formik } from "formik";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
// useformik
export default function EditProfileFormik({ curUser }) {
	const [open, setOpen] = useState(false);
	const uidFromLocalStorage = localStorage.getItem("uid");
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const formik = useFormik({
		initialValues: {
			id: uidFromLocalStorage,
			fname: curUser.fname,
			lname: curUser.lname,
			fatherName: curUser.fatherName,
			atClass: curUser.atClass,
			age: curUser.age,
			phone: curUser.phone,
		},
		validationSchema: yup.object().shape({
			fname: yup.string().required(),
			lname: yup.string().required(),
			fatherName: yup.string().required(),
			atClass: yup.number().required().positive().integer(),
			age: yup.number().required().positive().integer(),
			phone: yup.number().required().positive().integer(),
		}),

		onSubmit: async (values) => {
			try {
				const res = await axios.post("user/edit-profile", values);
				if (res.data.message) {
					alert(res.data.message);
					handleClose();
				} else {
					alert("User not update!");
					handleClose();
				}
			} catch (error) {
				console.log(error);
				handleClose();
			}
		},
	});

	return (
		<div>
			<Fab
				sx={{ color: "#fff", backgroundColor: "#ff5100" }}
				aria-label="edit"
				size="small"
				onClick={handleClickOpen}
			>
				<FaUserEdit color="white" size="18px" />
			</Fab>
			{/* Openning Dialouge Box */}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle align="center" backgroundColor="white">
					Edit Profile
				</DialogTitle>
				<DialogContent>
					<form onSubmit={formik.handleSubmit}>
						<TextField
							autoFocus
							margin="dense"
							name="fname"
							label="First Name"
							type="text"
							variant="outlined"
							value={formik.values.fname}
							onChange={formik.handleChange("fname")}
							autoComplete="off"
							fullWidth
							color="success"
							// required
						/>
						{formik.errors.fname && formik.touched.fname && (
							<p style={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.fname}
							</p>
						)}
						<TextField
							margin="dense"
							name="lname"
							label="Last Name"
							type="text"
							variant="outlined"
							value={formik.values.lname}
							onChange={formik.handleChange("lname")}
							autoComplete="off"
							fullWidth
							color="success"
							// required
						/>
						{formik.errors.lname && formik.touched.lname && (
							<p style={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.lname}
							</p>
						)}
						<TextField
							margin="dense"
							name="fatherName"
							label="Son of"
							type="text"
							variant="outlined"
							value={formik.values.fatherName}
							onChange={formik.handleChange("fatherName")}
							autoComplete="off"
							fullWidth
							color="success"
							// required
						/>
						{formik.errors.fatherName && formik.touched.fatherName && (
							<p style={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.fatherName}
							</p>
						)}
						<TextField
							margin="dense"
							name="atClass"
							label="In Class"
							type="number"
							variant="outlined"
							value={formik.values.atClass}
							onChange={formik.handleChange("atClass")}
							autoComplete="off"
							fullWidth
							color="success"
						/>
						{formik.errors.atClass && formik.touched.atClass && (
							<p style={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.atClass}
							</p>
						)}
						<TextField
							margin="dense"
							name="age"
							label="Age"
							type="number"
							variant="outlined"
							value={formik.values.age}
							onChange={formik.handleChange("age")}
							autoComplete="off"
							fullWidth
							color="success"
							// required
						/>
						{formik.errors.age && formik.touched.age && (
							<p style={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.age}
							</p>
						)}
						<TextField
							margin="dense"
							name="phone"
							label="Contact No..."
							type="number"
							variant="outlined"
							value={formik.values.phone}
							onChange={formik.handleChange("phone")}
							autoComplete="off"
							fullWidth
							color="success"
							// required
						/>
						{formik.errors.phone && formik.touched.phone && (
							<p style={{ color: "red", marginLeft: "5px" }}>
								{formik.errors.phone}
							</p>
						)}
						{/* <Button variant="contained" type="submit">
							Save Edit
						</Button> */}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						color="success"
						variant="contained"
						onClick={formik.handleSubmit}
					>
						Save Edit
					</Button>

					<Button color="success" onClick={handleClose}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
