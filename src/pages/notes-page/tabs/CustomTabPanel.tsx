import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { StudyClass } from "../../../models/StudyClass";

interface TabPanelProps {
	index: number;
	value: number;
	classes?: StudyClass[];
}

export const CustomTabPanel = ({ value, index, classes }: TabPanelProps) => {
	const sortedClasses = [...(classes ?? [])].sort((a, b) => {
		if (a.semester === b.semester) {
			return a.name.localeCompare(b.name);
		}
		return a.semester - b.semester;
	});

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`year-of-study-tabpanel-${index}`}
			aria-labelledby={`year-of-study-tabpanel-${index}`}
			style={{ width: "100%", color: "black" }}>
			{value === index && (
				<Box p={3}>
					<TableContainer>
						<Table sx={{ width: "100%" }}>
							<TableHead>
								<TableRow>
									<TableCell>Nr.Crt</TableCell>
									<TableCell align="right">
										Numele disciplinei
									</TableCell>
									<TableCell align="right">
										Nr. credite
									</TableCell>
									<TableCell align="right">Tip</TableCell>
									<TableCell align="right">
										Semestru
									</TableCell>
									<TableCell align="right">Nota</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{sortedClasses?.map((cls, index) => {
									const typeOfClass =
										cls.type.toLocaleUpperCase()[0];
									return (
										<TableRow key={index}>
											<TableCell>{index + 1}</TableCell>
											<TableCell align="right">
												{cls.name}
											</TableCell>
											<TableCell align="right">
												{cls.credits}
											</TableCell>
											<TableCell align="right">
												{typeOfClass}
											</TableCell>
											<TableCell align="right">
												{cls.semester}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			)}
		</Typography>
	);
};
