import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Card, CardContent, Typography } from "@mui/material";

export const LoggedHomePage = () => {
	const { currentUser } = useContext(AuthContext);
	return (
		<Card sx={{ minWidth: "100%" }}>
			<CardContent>
				<Typography variant="h4">
					Bine ai venit, {currentUser?.name}!
				</Typography>
			</CardContent>
		</Card>
	);
};
