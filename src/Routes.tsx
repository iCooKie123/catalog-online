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
  AdminClassesPage,
} from "@/pages";
const adminRole = [UserRoles.Admin];
const studentRole = [UserRoles.Student];
const allRoles = [UserRoles.Student, UserRoles.Admin];
const notLoggedInRole = "not-logged-in";

export const routes: CustomRoute[] = [
  {
    path: "",
    element: <HomePage></HomePage>,
    text: "Home",
    access: "all",
  },
  {
    path: "test-page",
    element: (
      <RequireRoleRoute access={adminRole}>
        <TestPage></TestPage>
      </RequireRoleRoute>
    ),
    text: "Test",
    access: adminRole,
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
    path: "register",
    element: (
      <RequireRoleRoute access={notLoggedInRole}>
        <RegisterPage></RegisterPage>
      </RequireRoleRoute>
    ),
    text: "Register",
    visible: false,
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
    text: "Classes",
    access: adminRole,
  },
];
