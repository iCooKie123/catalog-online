import { Box, Button, Grid, Typography } from "@mui/material";
import { useLoginPage } from "./hooks";
import { PasswordField, Textfield } from "../../components";
import { FormProvider } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../contexts";

export const LoginPage = () => {
	const methods = useLoginPage();
	const { setCurrentUser } = useContext(AuthContext);
	return (
		<FormProvider {...methods}>
			<Box
				sx={{
					backgroundColor: "white",
					padding: "1rem",
					margin: "1rem",
					display: "flex",
					alignItems: "center",
					width: "100%",
				}}>
				<Grid
					container
					spacing={{ xs: 2 }}
					columns={2}
					padding={4}>
					<Grid
						xs={2}
						md={4}>
						<Typography
							variant="h3"
							color="black">
							Login page
						</Typography>
					</Grid>
					<Grid
						item
						xs={2}>
						<Textfield
							id={"input-username-login"}
							name={"username"}
							label={"Username"}></Textfield>
					</Grid>
					<Grid
						item
						xs={2}>
						<PasswordField
							id="input-password-login"
							name="password"></PasswordField>
					</Grid>
					<Grid
						item
						xs={2}>
						<Button
							onClick={() => setCurrentUser({ name: "Alex" })}>
							asd
						</Button>
					</Grid>
				</Grid>
			</Box>
		</FormProvider>
	);
};
