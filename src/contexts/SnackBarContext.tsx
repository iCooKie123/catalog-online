import { createContext, useContext, useState } from "react";
import { Button, Snackbar, SnackbarCloseReason } from "@mui/material";
import React from "react";

type SnackBarContextProps = {
	showSnackBar: (message: string) => void;
};
//TODO: Implement error/success snackbar
const SnackBarContext = createContext<SnackBarContextProps>({
	showSnackBar: () => {},
});

export const useSnackBar = () => {
	return useContext(SnackBarContext);
};

export const SnackBarProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");

	const showSnackBar = (message: string) => {
		setMessage(message);
		setOpen(true);
	};

	const handleClose = (
		event?: React.SyntheticEvent,
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
				onClose={(e, reason) => {
					if (reason === "clickaway") return;
					setOpen(false);
				}}
				message={message}
				action={
					<React.Fragment>
						<Button
							color="secondary"
							size="small"
							onClick={handleClose}>
							UNDO
						</Button>
					</React.Fragment>
				}
			/>
		</SnackBarContext.Provider>
	);
};
