import { Box, Button, Grid } from "@mui/material";
import { useLoginPage } from "./hooks";
import { PasswordField } from "../../components";
import { FormProvider } from "react-hook-form";

export const LoginPage = () => {
	const methods = useLoginPage();
	return (
		<FormProvider {...methods}>
			<Box sx={{ flexGrow: 1, backgroundColor: "white" }}>
				<Grid
					container
					spacing={{ xs: 2 }}
					columns={{ xs: 4 }}
					padding={4}>
					<Grid
						item
						xs={2}>
						<PasswordField name={"password"}></PasswordField>
					</Grid>
				</Grid>
			</Box>
		</FormProvider>
	);
};
