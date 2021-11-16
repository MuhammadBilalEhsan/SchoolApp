import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Chip, Paper, TextField, Box } from "@mui/material";

const ListItem = styled("li")(({ theme }) => ({
	margin: theme.spacing(0.5),
}));
// { topicChips, setTopicChips }
export default function AddTopic({
	topicChips,
	setTopicChips,
	topicErr,
	setTopicErr,
}) {
	const [topicLabel, setTopicLabel] = useState("");

	const handleDelete = (chipToDelete) => () => {
		setTopicChips((chips) =>
			topicChips.filter((chip) => chip.key !== chipToDelete.key),
		);
	};
	const addChip = () => {
		const topicLabelTrim = topicLabel.trim();
		if (topicLabelTrim.length == "") {
			setTopicLabel("");
		} else {
			const topicObj = {
				key: new Date().getTime().toString(),
				label: topicLabelTrim,
			};
			setTopicChips([...topicChips, topicObj]);
			setTopicLabel("");
			setTopicErr(false);
		}
	};
	const handleChange = (e) => {
		setTopicLabel(e.target.value);
		if (topicLabel.length >= 10) {
			addChip();
		}
	};
	const handleKeyPress = (e) => {
		if (e.key === " " || e.key === "Enter") {
			addChip();
		}
	};

	return (
		<Box width="100%">
			{/* {topicChips.length < 4 ? (
				<> */}
			<TextField
				InputProps={{
					startAdornment: (
						<>
							{topicChips?.map((data) => {
								return (
									<Chip
										sx={{ backgroundColor: "#00800030", marginRight: 1 }}
										key={data.key}
										label={data.label}
										onDelete={handleDelete(data)}
									/>
								);
							})}
						</>
					),
				}}
				disabled={topicChips.length >= 4 ? true : false}
				margin="dense"
				name="topicItems"
				label="Topics"
				type="text"
				variant="outlined"
				value={topicLabel}
				onChange={(e) => handleChange(e)}
				onKeyPress={(e) => handleKeyPress(e)}
				autoComplete="off"
				color="success"
				className="abc"
				fullWidth
			/>
			{topicErr ? (
				<p style={{ color: "red", marginLeft: "5px" }}>
					Please Add at least 1 Topic
				</p>
			) : (
				""
			)}
			{/* {formik.errors.topicItems && formik.touched.topicItems && (
						<p style={{ color: "red", marginLeft: "5px" }}>
							{formik.errors.topicItems}
						</p>
					)} */}
		</Box>
	);
}
