import { Avatar, Box, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../contexts";

export const ProfileSection = () => {
	const { currentUser } = useContext(AuthContext);
	return currentUser ? (
		<Box
			display={"flex"}
			alignItems="center"
			gap={1}>
			<Avatar>{currentUser?.name.charAt(0)}</Avatar>
			<Typography variant="h6">{currentUser?.name}</Typography>
		</Box>
	) : null;
};
