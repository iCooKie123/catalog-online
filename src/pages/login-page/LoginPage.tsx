import { Box, Button, Grid, Typography } from "@mui/material";
import { useLoginPage } from "./hooks";
import { PasswordField, Textfield } from "../../components";
import { FormProvider } from "react-hook-form";

export const headingText = "Conectați-vă la contul dvs.";

export const LoginPage = () => {
    const { methods, onLogin, isLoading } = useLoginPage();

    return (
        <FormProvider {...methods}>
            <Box
                sx={{
                    backgroundColor: "white",
                    padding: "1rem",
                    margin: "1rem",
                }}
                width={{ xs: "80%", sm: "75%", md: "60%", xl: "50%" }}>
                <form
                    data-testid="login-form"
                    onSubmit={methods.handleSubmit(onLogin)}>
                    <Grid
                        container
                        spacing={{ xs: 2 }}
                        columns={2}
                        padding={4}>
                        <Grid
                            item
                            xs={2}
                            md={4}>
                            <Typography
                                variant="h3"
                                color="black"
                                data-testid="login-page-header">
                                {headingText}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={2}>
                            <Textfield
                                dataTestId="input-email-login"
                                id={"input-username-login"}
                                name={"email"}
                                label={"Email"}></Textfield>
                        </Grid>
                        <Grid
                            item
                            xs={2}>
                            <PasswordField
                                id="input-password-login"
                                dataTestId="input-password-login"
                                name="password"
                                label="Parolă"></PasswordField>
                        </Grid>
                        <Grid
                            item
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                            gap={2}
                            xs={2}>
                            <Button
                                variant="contained"
                                type="submit"
                                data-testid="login-button"
                                disabled={isLoading}>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            {isLoading ?? <Box data-testid="loading">loading..</Box>}
        </FormProvider>
    );
};
