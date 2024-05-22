import "@testing-library/jest-dom";
import { AuthWrapper } from "./AuthWrapper";
import { NotesPages } from "../src/pages/notes-page/NotesPage";
import { User, UserRoles } from "@/models";
import {
    act,
    render,
    screen,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import anul1 from "./dataMock/anul1.json";
import anul3 from "./dataMock/anul3.json";
import axios from "../src/axios";
import mockAxios from "axios-mock-adapter";
import { notesUrl } from "@/pages/notes-page/hooks";
describe("NotesPage", () => {
    it("should render the component", async () => {
        const mock = new mockAxios(axios);
        mock.onGet(notesUrl).reply(200, anul1);

        const user: User = {
            firstName: "test",
            lastName: "test",
            email: "test",
            yearOfStudy: 1,
            learningCycle: "test",
            faculty: "test",
            specialization: "test",
            group: "test",
            role: UserRoles.Student,
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
        mock.onGet(notesUrl).reply(200, anul1);

        const user: User = {
            firstName: "test",
            lastName: "test",
            email: "test",
            yearOfStudy: 1,
            learningCycle: "test",
            faculty: "test",
            specialization: "test",
            group: "test",
            role: UserRoles.Student,
        };

        render(
            <AuthWrapper user={user}>
                <NotesPages></NotesPages>
            </AuthWrapper>
        );

        await waitForElementToBeRemoved(() => screen.queryByTestId("loading"));

        const classes = anul1.filter((cls) => cls.class.yearOfStudy === 1);
        const firstSemesterAverageGrade =
            classes
                .filter((cls) => cls.class.semester === 1)
                .reduce((acc, cls) => acc + (cls.grade ?? 0), 0) /
            classes.filter((cls) => cls.class.semester === 1).length;

        const secondSemesterAverageGrade =
            classes
                .filter((cls) => cls.class.semester === 2)
                .reduce((acc, cls) => acc + (cls.grade ?? 0), 0) /
            classes.filter((cls) => cls.class.semester === 2).length;

        const totalCredits = classes
            .filter((cls) => cls.grade > 4)
            .reduce((acc, cls) => acc + (cls.class.credits ?? 0), 0);
        expect(screen.queryAllByTestId("table-row").length).toBe(
            classes.length
        );

        expect(screen.getByText("Anul 1")).toBeInTheDocument();
        expect(screen.getByText("Anul de studiu: 1")).toBeInTheDocument();
        expect(
            screen.getByText(
                `Medie generala sem I:${firstSemesterAverageGrade}`
            )
        ).toBeInTheDocument();
        expect(
            screen.getByText(
                `Medie generala sem II: ${secondSemesterAverageGrade}`
            )
        ).toBeInTheDocument();
        expect(
            screen.getByText(`Puncte credit total: ${totalCredits}`)
        ).toBeInTheDocument();
    });

    it("should render the component for year 3", async () => {
        const mock = new mockAxios(axios);
        mock.onGet(notesUrl).reply(200, anul3);

        const user: User = {
            firstName: "test",
            lastName: "test",
            email: "test",
            yearOfStudy: 1,
            learningCycle: "test",
            faculty: "test",
            specialization: "test",
            group: "test",
            role: UserRoles.Student,
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

    it("should calculate averages correctly for year 3", async () => {
        const mock = new mockAxios(axios);
        mock.onGet(notesUrl).reply(200, anul3);

        const user: User = {
            firstName: "test",
            lastName: "test",
            email: "test",
            yearOfStudy: 1,
            learningCycle: "test",
            faculty: "test",
            specialization: "test",
            group: "test",
            role: UserRoles.Student,
        };

        render(
            <AuthWrapper user={user}>
                <NotesPages></NotesPages>
            </AuthWrapper>
        );

        await waitForElementToBeRemoved(() => screen.queryByTestId("loading"));

        expect(screen.queryAllByTestId("table-row").length).toBe(5);

        expect(screen.getByText("Anul de studiu: 3")).toBeInTheDocument();
        expect(screen.getByText("Media generala: 6.8"));
        expect(screen.getByText("Medie generala sem I: 6")).toBeInTheDocument();
        expect(
            screen.getByText("Medie generala sem II: 8")
        ).toBeInTheDocument();
        expect(screen.getByText("Puncte credit total: 16")).toBeInTheDocument();
    });

    it("should change the tab and calculate averages correctly", async () => {
        const mock = new mockAxios(axios);
        mock.onGet(notesUrl).reply(200, anul3);

        const user: User = {
            firstName: "test",
            lastName: "test",
            email: "test",
            yearOfStudy: 1,
            learningCycle: "test",
            faculty: "test",
            specialization: "test",
            group: "test",
            role: UserRoles.Student,
        };

        render(
            <AuthWrapper user={user}>
                <NotesPages></NotesPages>
            </AuthWrapper>
        );

        await waitForElementToBeRemoved(() => screen.queryByTestId("loading"));

        const tab2 = screen.getByTestId("tab-2");
        act(() => tab2.click());

        expect(screen.queryAllByTestId("table-row").length).toBe(4);

        expect(screen.getByText("Anul de studiu: 2")).toBeInTheDocument();
        expect(screen.getByText("Media generala: 5.25"));
        expect(
            screen.getByText("Medie generala sem I: 6.5")
        ).toBeInTheDocument();
        expect(
            screen.getByText("Medie generala sem II: 4")
        ).toBeInTheDocument();
        expect(screen.getByText("Puncte credit total: 10")).toBeInTheDocument();
    });
});
