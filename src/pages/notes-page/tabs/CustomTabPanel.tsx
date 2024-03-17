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
							<colgroup>
								<col style={{ width: "5%" }}></col>
								<col style={{ width: "30%" }}></col>
								<col style={{ width: "5%" }}></col>
								<col style={{ width: "10%" }}></col>
								<col style={{ width: "10%" }}></col>
								<col style={{ width: "10%" }}></col>
							</colgroup>
							<TableHead>
								<TableRow key={"no mopre"}>
									<TableCell sx={{ width: "1%" }}>
										Nr.Crt
									</TableCell>
									<TableCell align="center">
										Numele disciplinei
									</TableCell>
									<TableCell align="center">
										Nr. credite
									</TableCell>
									<TableCell align="center">Tip</TableCell>
									<TableCell align="center">
										Semestru
									</TableCell>
									<TableCell align="center">Nota</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{sortedClasses?.map((cls, index) => {
									const typeOfClass =
										cls.type.toLocaleUpperCase()[0];
									return (
										<TableRow
											key={cls.id}
											sx={{
												backgroundColor:
													!!cls.grade && cls.grade < 4
														? "red"
														: "unset",
											}}>
											<TableCell sx={{ width: "1%" }}>
												{index + 1}
											</TableCell>
											<TableCell align="center">
												{cls.name}
											</TableCell>
											<TableCell align="center">
												{cls.credits}
											</TableCell>
											<TableCell align="center">
												{typeOfClass}
											</TableCell>
											<TableCell align="center">
												{cls.semester}
											</TableCell>
											<TableCell align="center">
												{cls.grade ?? "-"}
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
