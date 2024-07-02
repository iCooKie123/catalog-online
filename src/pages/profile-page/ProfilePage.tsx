import { Typography, Box, Card, Grid, Button } from "@mui/material";
import { useState } from "react";
import { GeneralInformation } from "./GeneralInformation";
import { PersonalInformation } from "./PersonalInformation";
import { ChangePassword } from "./ChangePassword";

export const ProfilePage = () => {
    const [currentTab, setCurrentTab] = useState<number>(1);

    const componentArray = [
        <GeneralInformation></GeneralInformation>,
        <PersonalInformation></PersonalInformation>,
        <ChangePassword></ChangePassword>,
    ];

    return (
        <Card>
            <Box
                display="flex"
                flexDirection="column"
                p={2}>
                <Box
                    display="grid"
                    sx={{ placeItems: "center" }}>
                    <Typography variant="h5">Setarile profilului</Typography>
                </Box>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr",
                    }}>
                    <Grid
                        display="flex"
                        container
                        flexDirection="column"
                        gap="1rem"
                        p={1}>
                        <Button onClick={() => setCurrentTab(0)}>
                            Informatii generale
                        </Button>
                        <Button onClick={() => setCurrentTab(1)}>
                            Date personale
                        </Button>
                        <Button onClick={() => setCurrentTab(2)}>
                            Schimba parola
                        </Button>
                    </Grid>
                    <Grid>
                        {[0, 1, 2].map((index) => (
                            <Box
                                hidden={currentTab !== index}
                                p={2}>
                                {componentArray[index] ?? { index }}
                            </Box>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Card>
    );
};
