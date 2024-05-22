import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { VerticalTable } from "@/components";

export const LoggedHomePage = () => {
    const { currentUser } = useContext(AuthContext);

    const data = [
        {
            label: "Ciclu studii",
            value: currentUser?.learningCycle ?? "N/A",
        },
        { label: "Facultate", value: currentUser?.faculty },
        { label: "Specializare", value: currentUser?.specialization ?? "N/A" },
        { label: "Grupa", value: currentUser?.group ?? "N/A" },
        { label: "An de studiu", value: currentUser?.yearOfStudy ?? "N/A" },
    ];
    return (
        <Card sx={{ minWidth: "100%" }}>
            <CardContent>
                <Typography variant="h4">
                    Bine ai venit, {currentUser?.firstName}{" "}
                    {currentUser?.lastName}!
                </Typography>
                <Divider sx={{ marginTop: 2, marginBottom: 4 }}></Divider>
                <Typography variant="h5">
                    Informații generale despre ciclul de studii:
                </Typography>
                <Box
                    display="flex"
                    justifyContent="center"
                    mt={2}
                    alignItems="center"
                    width="100%">
                    <Box width="auto">
                        <VerticalTable data={data} />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};
