import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../contexts";

type AnonymousRouteProps = {
	children: React.ReactNode;
};
export const AnonymousRoute = ({ children }: AnonymousRouteProps) => {
	const { currentUser } = useContext(AuthContext);
	if (currentUser) {
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	return children;
};
