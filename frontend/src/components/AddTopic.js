import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Chip, Paper, TextField, Box, Tooltip, Fab } from "@mui/material";
import { BiPlusMedical } from "react-icons/bi";

const ListItem = styled("li")(({ theme }) => ({
	margin: theme.spacing(0.5),
}));

export default function AddTopic({ topicChips, setTopicChips }) {
	const [topicLabel, setTopicLabel] = useState("");

	const handleDelete = (chipToDelete) => () => {
		setTopicChips((chips) =>
			topicChips.filter((chip) => chip.key !== chipToDelete.key),
		);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (topicLabel.length > 8) {
			alert("a1 to 8 chars");
		} else {
			const topicObj = {
				key: new Date().getTime().toString(),
				label: topicLabel,
			};
			setTopicChips([...topicChips, topicObj]);
			setTopicLabel("");
		}
	};

	return (
		<Box width="100%">
			{topicChips.length > 0 ? (
				<Paper
					sx={{
						display: "flex",
						justifyContent: "flex-start",
						flexWrap: "wrap",
						listStyle: "none",
						wordWrap: "break-word",
						p: 0.5,
						mb: 1,
					}}
					component="ul"
				>
					{topicChips.map((data) => {
						return (
							<ListItem key={data.key}>
								<Chip label={data.label} onDelete={handleDelete(data)} />
							</ListItem>
						);
					})}
				</Paper>
			) : (
				<></>
			)}
			{topicChips.length < 4 ? (
				<>
					<TextField
						autoFocus
						margin="dense"
						name="topicItems"
						label="Topics"
						type="text"
						variant="outlined"
						value={topicLabel}
						onChange={(e) => setTopicLabel(e.target.value)}
						autoComplete="off"
						color="success"
						fullWidth
					/>
					{/* {formik.errors.topicItems && formik.touched.topicItems && (
						<p style={{ color: "red", marginLeft: "5px" }}>
							{formik.errors.topicItems}
						</p>
					)} */}
					{topicLabel != "" ? (
						<Tooltip title="Add Topic" arrow>
							<Fab
								size="small"
								sx={{
									backgroundColor: "green",
									"&:hover": {
										backgroundColor: "green",
									},
								}}
								onClick={handleSubmit}
							>
								<BiPlusMedical color="#fff" />
							</Fab>
						</Tooltip>
					) : (
						""
					)}
				</>
			) : (
				""
			)}
		</Box>
	);
}
