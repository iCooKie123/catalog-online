import { AnonymousRoute, ProtectedRoute } from "./components";
import { CustomRoute } from "./models/CustomRoute";
import {
	HomePage,
	TestPage,
	LoginPage,
	RegisterPage,
	NotesPages,
	ProfilePage,
} from "@/pages";

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
	{
		path: "register",
		element: (
			<AnonymousRoute>
				<RegisterPage></RegisterPage>
			</AnonymousRoute>
		),
		type: "anonymous",
		text: "Register",
		visible: false,
	},
	{
		path: "notes",
		element: (
			<ProtectedRoute>
				<NotesPages></NotesPages>
			</ProtectedRoute>
		),
		type: "protected",
		text: "Note",
	},
	{
		path: "profile",
		element: (
			<ProtectedRoute>
				<ProfilePage></ProfilePage>
			</ProtectedRoute>
		),
		type: "protected",
		text: "Profil",
		visible: false,
	},
];
