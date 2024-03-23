import "@testing-library/jest-dom";
import { AuthWrapper } from "./AuthWrapper";
import { NotesPages } from "../src/pages/notes-page/NotesPage";
import { User } from "@/models";
import {
	render,
	screen,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import anul1 from "./dataMock/anul1.json";
import anul3 from "./dataMock/anul3.json";
import axios from "../src/axios";
import mockAxios from "axios-mock-adapter";

describe("NotesPage", () => {
	it("should render the component", async () => {
		const mock = new mockAxios(axios);
		mock.onGet("years_of_study.json").reply(200, anul1);

		const user: User = {
			name: "test",
			yearOfStudy: 1,
		};

		render(
			<AuthWrapper user={user}>
				<NotesPages></NotesPages>
			</AuthWrapper>
		);

		await waitForElementToBeRemoved(() => screen.queryByTestId("loading"));

		expect(screen.getByTestId("tab-1")).toBeInTheDocument();
		expect(screen.queryByTestId("tab-2")).not.toBeInTheDocument();
		expect(screen.queryByTestId("tab-3")).not.toBeInTheDocument();
		expect(screen.queryByTestId("tab-4")).not.toBeInTheDocument();
	});

	it("should calculate averages correctly", async () => {
		const mock = new mockAxios(axios);
		mock.onGet("years_of_study.json").reply(200, anul1);

		const user: User = {
			name: "test",
			yearOfStudy: 1,
		};

		render(
			<AuthWrapper user={user}>
				<NotesPages></NotesPages>
			</AuthWrapper>
		);

		await waitForElementToBeRemoved(() => screen.queryByTestId("loading"));

		expect(screen.queryAllByTestId("table-row").length).toBe(4);

		expect(screen.getByText("Anul 1")).toBeInTheDocument();
		expect(screen.getByText("Anul de studiu: 1")).toBeInTheDocument();
		expect(
			screen.getByText("Medie generala sem I: 6.5")
		).toBeInTheDocument();
		expect(
			screen.getByText("Medie generala sem II: 4")
		).toBeInTheDocument();
		expect(screen.getByText("Puncte credit total: 10")).toBeInTheDocument();
	});

	it("should render the component for year 3", async () => {
		const mock = new mockAxios(axios);
		mock.onGet("years_of_study.json").reply(200, anul3);

		const user: User = {
			name: "test",
			yearOfStudy: 3,
		};

		render(
			<AuthWrapper user={user}>
				<NotesPages></NotesPages>
			</AuthWrapper>
		);

		await waitForElementToBeRemoved(() => screen.queryByTestId("loading"));

		expect(screen.getByText("Anul 3")).toBeInTheDocument();
		expect(screen.queryByTestId("tab-1")).toBeInTheDocument();
		expect(screen.queryByTestId("tab-2")).toBeInTheDocument();
		expect(screen.queryByTestId("tab-3")).toBeInTheDocument();
		expect(screen.queryByTestId("tab-4")).not.toBeInTheDocument();
	});
});
