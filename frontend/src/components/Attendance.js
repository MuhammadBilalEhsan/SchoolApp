import React, { useState, useEffect } from "react";

import { makeStyles } from "@mui/styles";

import { styled } from "@mui/material/styles";
import { Box, Typography, Button } from "@mui/material";
import LinearProgress, {
	linearProgressClasses,
} from "@mui/material/LinearProgress";
import moment from "moment-business-days";
import Header from "./Header";
import axios from "axios";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor:
			theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.mode === "light" ? "green" : "#30e833",
	},
}));
const useStyles = makeStyles((theme) => ({
	// main: {
	// 	height: "100vh",
	// },
	attendance_top: {
		textAlign: "center",
	},
}));

const Attendance = ({ curUser }) => {
	const classes = useStyles();

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
			if (checkTodayAtt) {
				setTodayAttend(true);
			} else {
				setTodayAttend(false);
			}
		}
	};

	// ____________________________________________________________________________________________
	const overAllAttCalc = () => {
		if (curUser.attendance && curUser.attendance.length > 0) {
			if (
				moment(curUser.dateOfAddmission).month() === moment().month() &&
				moment(curUser.dateOfAddmission).year() === moment().year()
			) {
				setAttPercent(lastMonthPercent);
			} else {
				// getting total working/bussiness days (dateOfAddmission- curr Date)

				const largeDOA = moment(curUser.dateOfAddmission);
				const monthDOA = largeDOA.month() + 1;
				const dateDOA = largeDOA.date();
				const yearDOA = largeDOA.year();
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
	useEffect(() => {
		checkTodayAtt();
		latestMonthAttCalc();
		overAllAttCalc();
	});

	return (
		<>
			<Box className={`_main`}>
				<Header />
				<Box>
					<Box className={classes.attendance_top}>
						<Typography mt={8} mb={2} variant="h4" display="inline-block">
							Mark Today's Attendance
						</Typography>

						<Box>
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
						</Box>
					</Box>
					<Box my={5} mx="auto" sx={{ width: "80%" }} display="block">
						<Typography variant="h6">This Month Attendance</Typography>
						<BorderLinearProgress
							thickness={2}
							color="success"
							variant="determinate"
							value={Math.round(lastMonthPercent)}
						/>
						<Typography variant="h6">
							{Math.round(lastMonthPercent)}%
						</Typography>
					</Box>{" "}
					<br />
					<br />
					<Box mx="auto" sx={{ width: "80%" }}>
						<Typography variant="h6">Overall Attendance</Typography>
						<BorderLinearProgress
							color="success"
							variant="determinate"
							value={Math.round(attPercent)}
						/>
						<Typography variant="h6">{Math.round(attPercent)}%</Typography>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Attendance;
