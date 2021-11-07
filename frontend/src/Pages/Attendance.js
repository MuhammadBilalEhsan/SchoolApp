import React, { useState, useEffect } from "react";
import UserSidebar from "./UserSidebar.js";
// import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment-business-days";
import "../css/attendance.css";
import axios from "axios";

const Attendance = ({ curUser }) => {
	const [todayAttend, setTodayAttend] = useState(null);
	const [firstDate, setFirstDate] = useState();
	const [curMonth, setCurMonth] = useState();
	const [curYear, setCurYear] = useState();
	const [attPercent, setAttPercent] = useState(0);
	const [lastMonthPercent, setLastMonthPercent] = useState(0);

	const _id = localStorage.getItem("uid");

	// ____________________________________________________________________________________________

	const checkTodayAtt = () => {
		if (curUser.attendance && curUser.attendance.length > 0) {
			const attArr = curUser.attendance;
			const lastMonth = attArr[attArr?.length - 1];

			// check user have marked his/her attendance of today or not
			const checkTodayAtt = lastMonth.days.find(
				(curElem) => curElem.todayDate === moment().date(),
			);
			if (!checkTodayAtt) {
				setTodayAttend(false);
			} else {
				setTodayAttend(true);
			}
		}
	};

	// ____________________________________________________________________________________________
	const overAllAttCalc = () => {
		if (curUser.attendance && curUser.attendance.length > 0) {
			// getting total working/bussiness days (dateOfAddmission- curr Date)
			if (
				moment(curUser.dateOfAddmission).month() === moment().month() &&
				moment(curUser.dateOfAddmission).year() === moment().year()
			) {
				setAttPercent(lastMonthPercent);
			} else {
				const largeDOA = new Date(curUser.dateOfAddmission);
				const monthDOA = largeDOA.getMonth() + 1;
				const dateDOA = largeDOA.getDate();
				const yearDOA = largeDOA.getFullYear();
				const dateOfAddmission = `${monthDOA}-${dateDOA}-${yearDOA}`;
				let overallTotalDays = moment(
					dateOfAddmission,
					"MM-DD-YYYY",
				).businessDiff(moment(moment(), "MM-DD-YYYY"));
				// getting total days in which user present

				const abc = curUser.attendance.map((curElem) => {
					return curElem.days.length;
				});
				const overallPresentDays = abc?.reduce(myFunc);
				function myFunc(total, num) {
					return total + num;
				}
				const overAllOpperation = (overallPresentDays / overallTotalDays) * 100;
				// console.log(overallTotalDays,overallPresentDays);
				setAttPercent(overAllOpperation);
			}
		}
	};
	// ____________________________________________________________________________________________

	const latestMonthAttCalc = () => {
		if (curUser.attendance && curUser.attendance.length > 0) {
			// getting total working/bussiness days (01-CurMonth-curYear - curr Date)
			if (
				moment(curUser.dateOfAddmission).date() === moment().date() &&
				moment(curUser.dateOfAddmission).month() === moment().month() &&
				moment(curUser.dateOfAddmission).year() === moment().year()
			) {
				setLastMonthPercent(100);
			} else if (
				moment(curUser.dateOfAddmission).month() === moment().month() &&
				moment(curUser.dateOfAddmission).year() === moment().year()
			) {
				setFirstDate(moment(curUser.dateOfAddmission).date());
				setCurMonth(moment(curUser.dateOfAddmission).month() + 1);
				setCurYear(moment(curUser.dateOfAddmission).year());

				const firstDateOfCurMonth = `${curMonth}-${firstDate}-${curYear}`;
				const overallTotalDays = moment(
					firstDateOfCurMonth,
					"MM-DD-YYYY",
				).businessDiff(moment(moment(), "MM-DD-YYYY"));
				// getting total days of current month in which user present
				const attArr = curUser.attendance;
				const lastMonth = attArr[attArr?.length - 1];
				const curMonthTotalPresent = lastMonth.days.length;

				const curMonthOpperation =
					(curMonthTotalPresent / overallTotalDays) * 100;
				setLastMonthPercent(curMonthOpperation);
			} else {
				setFirstDate(1);
				setCurMonth(moment().month() + 1);
				setCurYear(moment().year());

				const firstDateOfCurMonth = `${curMonth}-${firstDate}-${curYear}`;
				const overallTotalDays = moment(
					firstDateOfCurMonth,
					"MM-DD-YYYY",
				).businessDiff(moment(moment(), "MM-DD-YYYY"));
				// getting total days of current month in which user present
				const attArr = curUser.attendance;
				const lastMonth = attArr[attArr?.length - 1];
				const curMonthTotalPresent = lastMonth.days.length;

				const curMonthOpperation =
					(curMonthTotalPresent / overallTotalDays) * 100;
				setLastMonthPercent(curMonthOpperation);
			}
		} else {
			console.log("ok");
		}
	};

	// ____________________________________________________________________________________________

	const handleClick = async (e) => {
		try {
			e.preventDefault();
			setTodayAttend(true);
			const att = new Date();
			const year = att.getFullYear();
			const month = att.getMonth();
			const date = att.getDate();
			const hours = att.getHours();
			const mins = att.getMinutes();

			const time = `${hours}:${mins}`;

			const attObj = { _id, year, month, date, time };
			const res = await axios.post("/user/attendance", attObj);
			console.log(res.data.message);
		} catch (err) {
			console.error(err);
			alert("Your Attendance not marked");
		}
	};
	// useEffect(() => {
	// 	checkTodayAtt();
	// 	latestMonthAttCalc();
	// 	overAllAttCalc();
	// }, []);
	useEffect(() => {
		checkTodayAtt();
		latestMonthAttCalc();
		overAllAttCalc();
	});

	return (
		<>
			<div className="parent">
				<UserSidebar />
				<div className="dashboard">
					<div className="sub_dash sub_dash_att">
						<div className="attendance_top">
							<Typography mt={8} mb={2} variant="h4">
								Mark Today's Attendance
							</Typography>

							{todayAttend ? (
								<Button
									size="small"
									variant="contained"
									color="success"
									disabled
								>
									Marked
								</Button>
							) : (
								<Button
									size="small"
									variant="contained"
									color="success"
									onClick={(e) => handleClick(e)}
								>
									Mark
								</Button>
							)}
						</div>

						<div className="attendance_bot">
							<div className="attendance_bot_left">
								<h1>This Month</h1>
								<CircularProgress
									color="success"
									thickness={2.2}
									size="50%"
									variant="determinate"
									value={Math.round(lastMonthPercent)}
								/>
								<h4>{Math.round(lastMonthPercent)}%</h4>
							</div>
							<div className="attendance_bot_right">
								<h1>Overall</h1>
								<CircularProgress
									color="success"
									thickness={2.2}
									size="50%"
									variant="determinate"
									value={Math.round(attPercent)}
								/>
								<h4>{Math.round(attPercent)}%</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Attendance;
