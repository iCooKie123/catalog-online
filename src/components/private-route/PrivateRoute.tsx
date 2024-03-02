import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

type ProtectedRouteProps = {
	children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { currentUser } = useContext(AuthContext);
	if (!currentUser) {
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	return children;
};
