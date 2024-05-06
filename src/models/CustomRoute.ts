import { UserRoles } from "./User";

export type CustomRoute = {
  path: string;
  element: JSX.Element;
  text: string;
  visible?: boolean;
  access: "all" | "not-logged-in" | UserRoles[];
};
