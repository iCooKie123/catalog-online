import { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

export const LoggedHomePage = () => {
	const { currentUser } = useContext(AuthContext);
	useEffect(() => {
		console.log(currentUser);
	}, [currentUser]);
	return (
		<div>
			<h1>Home Page</h1>
			<p>Welcome to the home page!</p>
			<p>User is logged in :{currentUser?.name}</p>
		</div>
	);
};
