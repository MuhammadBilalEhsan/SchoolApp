import React, { useState } from "react";

import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const ChangeProfilePic = () => {
	// const [formmData, setFormmData] = useState();
	const uidFromLocalStorage = localStorage.getItem("uid");

	const handleDpChange = async (e) => {
		e.preventDefault();
		try {
			const imgObj = e.target.files[0];

			let formData = new FormData();

			// formData.append("myImg", imgObj, imgObj.name);
			// formData.append("myImg", imgObj);
			// formData.append("_id", uidFromLocalStorage);
			formData.append("_id", uidFromLocalStorage);
			formData.append("myImg", imgObj);
			// setFormmData(formData);
			// const _id = formData.getAll("_id")[0];
			// const myImg = formData.getAll("myImg")[0];
			// const myObj = {
			// 	_id,
			// 	myImg,
			// };
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
	// const saveImg = (e) => {
	// 	console.log(formmData);
	// };
	return (
		<>
			<div>
				<input
					id="dp"
					type="file"
					name="dp"
					onChange={(e) => handleDpChange(e)}
				/>
				{/* <Button variant="contained" onClick={(e) => saveImg(e)}>
					Save Image
				</Button> */}
			</div>
		</>
	);
	// return (
	//   <>
	//     <div
	//       className="img-div"
	//       style={{
	//         background: imgPreview
	//           ? `url("${imgPreview}") no-repeat center/cover`
	//           : "rgba(4, 0, 255, 0.658)",
	//       }}
	//     >
	//       {error && <p>File Not Supported!</p>}
	//       {!imgPreview && (
	//         <>
	//           <label id="fileUploadLabel" htmlFor="fileUpload">
	//             Add Your <br /> Profile Image
	//           </label>
	//           <input type="file" id="fileUpload" onChange={handleDpChange} />
	//         </>
	//       )}
	//       {imgPreview && (
	//         <Fab
	//           sx={{
	//             backgroundColor: "red",
	//             position: "relative",
	//             left: "25%",
	//             top: "40%",
	//           }}
	//           size="small"
	//           onClick={() => {
	//             setImgPreview(null);
	//             setError(false);
	//           }}
	//         >
	//           <FaTrashAlt color="#fff" size="20px" />
	//         </Fab>
	//       )}
	//     </div>
	//   </>
	// );
};

export default ChangeProfilePic;
