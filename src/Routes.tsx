import { RequireRoleRoute } from "./components";
import { UserRoles } from "./models";
import { CustomRoute } from "./models/CustomRoute";
import {
	HomePage,
	TestPage,
	LoginPage,
	RegisterPage,
	NotesPages,
	ProfilePage,
} from "@/pages";
const adminRole = [UserRoles.Admin];
const unauthenticatedRole = [UserRoles.Unauthenticated];
const studentRole = [UserRoles.Student];
const studentAdminRole = [UserRoles.Student, UserRoles.Admin];

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
			<RequireRoleRoute role={adminRole}>
				<TestPage></TestPage>
			</RequireRoleRoute>
		),
		type: "protected",
		text: "Test",
		role: adminRole,
	},
	{
		path: "login",
		element: (
			<RequireRoleRoute role={unauthenticatedRole}>
				<LoginPage></LoginPage>
			</RequireRoleRoute>
		),
		type: "anonymous",
		text: "Login",
		role: unauthenticatedRole,
	},
	{
		path: "register",
		element: (
			<RequireRoleRoute role={unauthenticatedRole}>
				<RegisterPage></RegisterPage>
			</RequireRoleRoute>
		),
		type: "anonymous",
		text: "Register",
		visible: false,
		role: unauthenticatedRole,
	},
	{
		path: "notes",
		element: (
			<RequireRoleRoute role={studentRole}>
				<NotesPages></NotesPages>
			</RequireRoleRoute>
		),
		type: "protected",
		text: "Note",
		role: studentRole,
	},
	{
		path: "profile",
		element: (
			<RequireRoleRoute role={studentAdminRole}>
				<ProfilePage></ProfilePage>
			</RequireRoleRoute>
		),
		type: "protected",
		text: "Profil",
		visible: false,
		role: studentAdminRole,
	},
];
