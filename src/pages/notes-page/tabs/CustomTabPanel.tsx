import { Box, Typography } from "@mui/material";
import { StudyClass } from "../../../models/StudyClass";

interface TabPanelProps {
	index: number;
	value: number;
	classes: StudyClass[];
}

export const CustomTabPanel = (props: TabPanelProps) => {
	const { value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`year-of-study-tabpanel-${index}`}
			aria-labelledby={`year-of-study-tabpanel-${index}`}
			style={{ width: "100%", color: "black" }}
			{...other}>
			{value === index && (
				<Box p={3}>
					<></>
				</Box>
			)}
		</Typography>
	);
};
