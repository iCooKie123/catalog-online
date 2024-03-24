import "@testing-library/jest-dom";
import { AuthWrapper } from "./AuthWrapper";
import { render, screen } from "@testing-library/react";
import React from "react";
import { LoginPage, headingText } from "../src/pages";
``;
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
});
