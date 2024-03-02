import { useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const HomePage = () => {
	const { currentUser } = useContext(AuthContext);
	useEffect(() => {
		console.log(currentUser);
	}, []);
	return (
		<div>
			<h1>Home Page</h1>
			<p>Welcome to the home page!</p>
		</div>
	);
};
