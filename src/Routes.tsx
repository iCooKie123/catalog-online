import { CustomRoute } from "./models/CustomRoute";
import { HomePage } from "./pages";

export const routes: CustomRoute[] = [
	{
		path: "",
		element: <HomePage></HomePage>,
		isPrivate: false,
		text: "Home",
	},
	{
		path: "home",
		element: <HomePage></HomePage>,
		isPrivate: false,
		text: "HomeHome",
	},
];
