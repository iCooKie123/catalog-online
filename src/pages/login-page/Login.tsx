import {
	Box,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
} from "@mui/material";
import { useLoginPage } from "./hooks";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState } from "react";

export const LoginPage = () => {
	
	const methods = useLoginPage();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = methods;
	return (
		<Box sx={{ flexGrow: 1, backgroundColor: "white" }}>
			<Grid
				container
				spacing={{ xs: 2 }}
				columns={{ xs: 4 }}>
				<Grid
					item
					xs={2}>
					
				</Grid>
			</Grid>
		</Box>
	);
};
