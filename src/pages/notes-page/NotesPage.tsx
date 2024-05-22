import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { CustomTabPanel } from "./tabs/CustomTabPanel";
import { useNotesPage } from "./hooks";
import { VerticalTable } from "@/components";

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
        return <div data-testid="loading">Loading...</div>;
    }

    const verticalTableData = [
        { label: "Anul de studiu", value: currentTab + 1 },
        { label: "Media generala", value: averageGrade },
        { label: "Medie generala sem I", value: firstSemesterAverageGrade },
        { label: "Medie generala sem II", value: secondSemesterAverageGrade },
        { label: "Puncte credit total", value: totalCredits },
    ];

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
                <Divider></Divider>

                <Box
                    width="auto"
                    ml={2}
                    mb={2}>
                    <VerticalTable
                        data-testid="notes-situation"
                        data={verticalTableData}
                    />
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
                        classes={allClasses}
                        key={`Anul-${year}`}></CustomTabPanel>
                ))}
            </Box>
        </>
    );
};
