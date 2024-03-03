import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

export const LoggedHomePage = () => {
	const { currentUser } = useContext(AuthContext);
	return (
		<div>
			<h1>Home Page</h1>
			<p>Welcome to the home page!</p>
			<p>User is logged in :{currentUser?.name}</p>
		</div>
	);
};
