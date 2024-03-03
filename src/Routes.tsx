import { CustomRoute } from "./models/CustomRoute";
import { HomePage, TestPage } from "./pages";

export const routes: CustomRoute[] = [
	{
		path: "",
		element: <HomePage></HomePage>,
		isPrivate: false,
		text: "Home",
	},
	{
		path: "TestPage",
		element: <TestPage></TestPage>,
		isPrivate: false,
		text: "Test",
	},
];
