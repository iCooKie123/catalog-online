import { Box, Tab, Tabs, Typography } from "@mui/material";
import { CustomTabPanel } from "./tabs/CustomTabPanel";
import { useNotesPage } from "./hooks";

export const NotesPages = () => {
	const {
		handleChange,
		allClasses,
		currentTab,
		averageGrade,
		totalCredits,
		yearsOfStudyArray,
		firstSemesterAverageGrade,
		secondSemesterAverageGrade,
		isLoading,
	} = useNotesPage();

	if (isLoading) {
		return <div data-testId="loading">Loading...</div>;
	}

	return (
		<>
			<Box
				width={{ xs: "100%", md: "50%" }}
				marginTop={12}
				sx={{ backgroundColor: "white" }}>
				<Typography
					variant="h3"
					color="black"
					mb={2}
					padding={2}>
					Registru note
				</Typography>
				<Box
					sx={{
						width: "50%",
						color: "black",
					}}>
					<Typography
						key="year of study"
						id="year-of-study"
						variant="body1"
						color="black"
						paddingLeft={2}
						paddingBottom={1}>
						Anul de studiu: {currentTab + 1}
					</Typography>
					<Typography
						variant="body1"
						color="black"
						paddingLeft={2}
						id="average-grade"
						key={"average grade"}
						paddingBottom={1}>
						Media generala: {averageGrade}
					</Typography>
					<Typography
						variant="body1"
						color="black"
						paddingLeft={2}
						key={"totalCreditsFirstSemester"}
						id="totalCreditsFirstSemester"
						paddingBottom={1}>
						Medie generala sem I: {firstSemesterAverageGrade}
					</Typography>
					<Typography
						variant="body1"
						color="black"
						paddingLeft={2}
						key={"totalCreditsSecondSemester"}
						id="totalCreditsSecondSemester"
						paddingBottom={1}>
						Medie generala sem II: {secondSemesterAverageGrade}
					</Typography>
					<Typography
						variant="body1"
						color="black"
						paddingLeft={2}
						key={"totalCredits"}
						id="totalCredits"
						paddingBottom={1}>
						Puncte credit total: {totalCredits}
					</Typography>
				</Box>
				<Box
					padding={2}
					sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs
						value={currentTab}
						onChange={handleChange}
						aria-label="basic tabs example">
						{yearsOfStudyArray?.map((year) => (
							<Tab
								label={`Anul ${year + 1}`}
								key={year}
								data-testid={`tab-${year + 1}`}></Tab>
						))}
					</Tabs>
				</Box>
				{yearsOfStudyArray?.map((_, year) => (
					<CustomTabPanel
						index={year}
						value={currentTab}
						classes={allClasses}></CustomTabPanel>
				))}
			</Box>
		</>
	);
};
