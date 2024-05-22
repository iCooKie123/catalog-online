import "@testing-library/jest-dom";
import { AuthWrapper } from "./AuthWrapper";
import {
    act,
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import React from "react";
import { LoginPage, headingText } from "../src/pages";
import axios from "../src/axios";

describe("LoginPage", () => {
    it("should render the component when no user is logged in", async () => {
        render(
            <AuthWrapper>
                <LoginPage></LoginPage>
            </AuthWrapper>
        );
        expect(screen.getByTestId("login-page-header")).toBeInTheDocument();
        expect(screen.getByTestId("login-page-header")).toHaveTextContent(
            headingText
        );
        expect(screen.getByTestId("input-email-login")).toBeInTheDocument();
        expect(screen.getByTestId("input-password-login")).toBeInTheDocument();
    });

    // it("should render the error alert when the login fals", async () => {
    // 	render(
    // 		<AuthWrapper>
    // 			<LoginPage></LoginPage>
    // 		</AuthWrapper>
    // 	);
    // 	expect(screen.queryByTestId("error-alert")).not.toBeInTheDocument();
    // 	const mock = new mockAxios(axios);
    // 	mock.onPost("user/login").reply(403);
    // 	userEvent.type(
    // 		screen.getByTestId("input-email-login"),
    // 		"test@test.com"
    // 	);
    // 	userEvent.type(screen.getByTestId("input-password-login"), "test");
    // 	userEvent.click(screen.getByTestId("login-button"));
    // 	await waitFor(() => setTimeout(() => {}, 100));
    // 	expect(screen.getByTestId("error-alert")).toBeInTheDocument();
    // });
});
