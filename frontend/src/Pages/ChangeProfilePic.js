import React, { useState } from "react";

import { getStorage, ref, uploadBytes } from "firebase/storage";

import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import { FaTrashAlt } from "react-icons/fa";

const ChangeProfilePic = () => {
  const [imgPreview, setImgPreview] = useState(null);
  const [imgObj, setImgObj] = useState(null);
  const [error, setError] = useState(false);

  const storage = getStorage();

  // const handleDpChange = e => {
  //   const selected = e.target.files[0];
  //   const allowTypes = ["image/png", "image/jpeg", "image/jpg"];
  //   if (selected && allowTypes.includes(selected.type)) {
  //     let reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImgPreview(reader.result);
  //     };
  //     reader.readAsDataURL(selected);
  //   } else {
  //     setError(true);
  //     console.log("Not supported");
  //   }
  // };
  const saveImg = e => {
    e.preventDefault();
    const storageRef = ref(storage, `profile-images/${imgObj.name}`);

    uploadBytes(storageRef, imgObj).then(snapshot => {
      console.log(snapshot);
    });
  };

  return (
    <>
      <div>
        <input type="file" onChange={e => setImgObj(e.target.files[0])} />
        <Button onClick={e => saveImg(e)}>Save Image</Button>
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
