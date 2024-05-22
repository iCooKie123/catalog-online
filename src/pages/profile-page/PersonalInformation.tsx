import { AuthContext } from "@/contexts";
import { Box, TextField, Typography } from "@mui/material";
import { useContext } from "react";

export const PersonalInformation = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Box width={"100%"}>
            <Box sx={{ display: "grid", placeItems: "center" }}>
                <Typography variant="h6"> Date Personale </Typography>
            </Box>
            <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                gap={5}
                mb={4}>
                <TextField
                    fullWidth
                    value={currentUser?.firstName}
                    label="Nume"
                    disabled={true}
                    variant="outlined"></TextField>
                <TextField
                    fullWidth
                    value={currentUser?.lastName}
                    label="Prenume"
                    disabled={true}
                    variant="outlined"></TextField>
            </Box>
            <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                gap={5}
                mb={4}>
                <TextField
                    fullWidth
                    value={currentUser?.email}
                    label="Email"
                    disabled={true}
                    variant="outlined"></TextField>
            </Box>
        </Box>
    );
};
