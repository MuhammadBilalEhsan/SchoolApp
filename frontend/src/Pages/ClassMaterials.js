import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import UserSidebar from "./UserSidebar.js";
const ENDPOINT = "http://localhost:4000";

const ClassMaterials = () => {
	const curUser = useSelector((state) => state.usersReducer.curUser);

	useEffect(() => {
		const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
		socket.on("connect", () => {
			console.log("Frontend Connected");
		});

		socket.emit("joined", { curUser });

		return () => {
			socket.emit("disconnected");
			socket.off();
		};
	}, []);
	return (
		<>
			{curUser.roll === "student" ? (
				<div className="parent">
					<UserSidebar />

					<div className="dashboard">
						<div className="sub_dash sub_dash_pro_cla">Student</div>
					</div>
				</div>
			) : curUser.roll === "teacher" ? (
				<div className="parent">
					<UserSidebar />

					<div className="dashboard">
						<div className="sub_dash sub_dash_pro_cla"> Teacher</div>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
};
export default ClassMaterials;
