import { UserRoles } from "./User";

export type CustomRoute = {
	path: string;
	element: JSX.Element;
	type: "protected" | "anonymous" | "public";
	text: string;
	visible?: boolean;
	role?: UserRoles[] | UserRoles.Unauthenticated;
};
