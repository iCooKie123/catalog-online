import { useContext } from "react";
import { AuthContext } from "../../contexts";
import { LoggedHomePage } from "./loged-user";
import { NotLoggedHomePage } from "./not-logged-user";
export const HomePage = () => {
	const { currentUser } = useContext(AuthContext);
	if (!currentUser) {
		return <LoggedHomePage></LoggedHomePage>;
	}
	return <NotLoggedHomePage></NotLoggedHomePage>;
};
