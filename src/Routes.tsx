import { AnonymousRoute, ProtectedRoute } from "./components";
import { CustomRoute } from "./models/CustomRoute";
import { HomePage, TestPage, LoginPage } from "./pages";

export const routes: CustomRoute[] = [
	{
		path: "",
		element: <HomePage></HomePage>,
		type: "public",
		text: "Home",
	},
	{
		path: "test-page",
		element: (
			<ProtectedRoute>
				<TestPage></TestPage>
			</ProtectedRoute>
		),
		type: "protected",
		text: "Test",
	},
	{
		path: "login",
		element: (
			<AnonymousRoute>
				<LoginPage></LoginPage>
			</AnonymousRoute>
		),
		type: "anonymous",
		text: "Login",
	},
];
