import { AuthContext } from "@/contexts";
import { UserRoles } from "@/models";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

type RequireRoleRouteProps = {
	children: React.ReactNode;
	role: UserRoles[] | UserRoles.Unauthenticated;
};

export const RequireRoleRoute = ({ children, role }: RequireRoleRouteProps) => {
	const { currentUser } = useContext(AuthContext);

	if (role === UserRoles.Unauthenticated && !currentUser) {
		return children;
	}

	if (currentUser && Array.isArray(role) && role.includes(currentUser.role)) {
		return children;
	}

	if (currentUser && role === currentUser.role) {
		return children;
	}

	return (
		<Navigate
			to="/"
			replace
		/>
	);
};
