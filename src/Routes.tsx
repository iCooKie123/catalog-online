import { CustomRoute } from "./models/CustomRoute";
import { HomePage, TestPage, LoginPage } from "./pages";

export const routes: CustomRoute[] = [
	{
		path: "",
		element: <HomePage></HomePage>,
		isPrivate: false,
		text: "Home",
	},
	{
		path: "test-page",
		element: <TestPage></TestPage>,
		isPrivate: true,
		text: "Test",
	},
	{
		path: "login",
		element: <LoginPage></LoginPage>,
		isPrivate: false,
		text: "Login",
	},
];
