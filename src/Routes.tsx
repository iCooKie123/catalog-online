import { HomePage } from "./pages";

type CustomRoute = {
	path: string;
	element: JSX.Element;
	isPrivate: boolean;
};

export const routes: CustomRoute[] = [
	{
		path: "",
		element: <HomePage></HomePage>,
		isPrivate: false,
	},
	{
		path: "home",
		element: <HomePage></HomePage>,
		isPrivate: true,
	},
];
