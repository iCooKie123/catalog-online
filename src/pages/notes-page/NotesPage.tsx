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
	} = useNotesPage();

	return (
		<>
			<Box
				width={{ xs: "100%", md: "50%" }}
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
						paddingBottom={1}>
						Media generala: {averageGrade}
					</Typography>
					<Typography
						variant="body1"
						color="black"
						paddingLeft={2}
						paddingBottom={1}>
						PC total: {totalCredits}
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
								key={year}></Tab>
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
