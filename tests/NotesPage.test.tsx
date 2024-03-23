import {
	render,
	screen,
	waitForElementToBeRemoved,
} from "@testing-library/react";

import { NotesPages } from "../src/pages/notes-page/NotesPage";
import mockAxios from "axios-mock-adapter";
import axios from "axios";
import { AuthContextProvider } from "../src/contexts";
import { User } from "@/models";
import { vi } from "vitest";
import data from "./dataMock/notes.json";
import "@testing-library/jest-dom";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	const currentUserMock: User = { name: "test", yearOfStudy: 1 };
	return (
		<AuthContextProvider
			value={{
				currentUser: currentUserMock,
				setCurrentUser: vi.fn(),
			}}>
			{children}
		</AuthContextProvider>
	);
};

describe("NotesPage", () => {
	it("should render the component", async () => {
		const mock = new mockAxios(axios);
		mock.onGet(
			"https://my.api.mockaroo.com/years_of_study.json?key=1b233db0"
		).reply(200, data);

		render(
			<Wrapper>
				<NotesPages></NotesPages>
			</Wrapper>
		);

		await waitForElementToBeRemoved(() => screen.queryByTestId("loading"));

		screen.debug();

		expect(screen.getByTestId("tab-1")).toBeInTheDocument();
		expect(screen.queryByTestId("tab-4")).not.toBeInTheDocument();

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
});
