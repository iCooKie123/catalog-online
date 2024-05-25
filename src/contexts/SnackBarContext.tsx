import { createContext, useContext, useState } from "react";
import { Snackbar, SnackbarCloseReason, Alert } from "@mui/material";
import React from "react";

type SnackBarMode = "info" | "warning" | "error" | "success";

type SnackBarContextProps = {
    showSnackBar: (message: string, mode?: SnackBarMode) => void;
};

const SnackBarContext = createContext<SnackBarContextProps>({
    showSnackBar: () => { },
});

export const useSnackBar = () => {
    return useContext(SnackBarContext);
};

export const SnackBarProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [mode, setMode] = useState<SnackBarMode>("info");

    const showSnackBar = (message: string, mode: SnackBarMode = "info") => {
        setMessage(message);
        setMode(mode);
        setOpen(true);
    };

    const handleClose = (
        _event?: React.SyntheticEvent,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <SnackBarContext.Provider value={{ showSnackBar }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={(_e, reason) => {
                    if (reason === "clickaway") return;
                    setOpen(false);
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
                <Alert
                    onClose={handleClose}
                    severity={mode}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackBarContext.Provider>
    );
};
