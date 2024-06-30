import { RequireRoleRoute } from "./components";
import { UserRoles } from "./models";
import { CustomRoute } from "./models/CustomRoute";
import {
    HomePage,
    LoginPage,
    NotesPages,
    ProfilePage,
    AdminClassesPage,
    EditNews,
} from "@/pages";
import { SingleClassPage } from "./pages/admin-classes-page/single-class-page";
const adminRole = [UserRoles.Admin];
const studentRole = [UserRoles.Student];
const allRoles = [UserRoles.Student, UserRoles.Admin];
const notLoggedInRole = "not-logged-in";

export const routes: CustomRoute[] = [
    {
        path: "",
        element: <HomePage></HomePage>,
        text: "Acasă",
        access: "all",
    },
    {
        path: "login",
        element: (
            <RequireRoleRoute access={notLoggedInRole}>
                <LoginPage></LoginPage>
            </RequireRoleRoute>
        ),
        text: "Login",
        access: notLoggedInRole,
    },
    {
        path: "notes",
        element: (
            <RequireRoleRoute access={studentRole}>
                <NotesPages></NotesPages>
            </RequireRoleRoute>
        ),
        text: "Note",
        access: studentRole,
    },
    {
        path: "profile",
        element: (
            <RequireRoleRoute access={allRoles}>
                <ProfilePage></ProfilePage>
            </RequireRoleRoute>
        ),
        text: "Profil",
        visible: false,
        access: allRoles,
    },
    {
        path: "classes",
        element: (
            <RequireRoleRoute access={adminRole}>
                <AdminClassesPage></AdminClassesPage>
            </RequireRoleRoute>
        ),
        text: "Clase",
        access: adminRole,
    },
    {
        path: "classes/:id",
        element: (
            <RequireRoleRoute access={adminRole}>
                <SingleClassPage></SingleClassPage>
            </RequireRoleRoute>
        ),
        text: "Edit single class",
        access: adminRole,
        visible: false,
    },
    {
        path: "edit-news",
        element: (
            <RequireRoleRoute access={adminRole}>
                <EditNews></EditNews>
            </RequireRoleRoute>
        ),
        text: "Edit News",
        access: adminRole,
        visible: false,
    },
];
