import { useContext } from "react";
import { AuthContext } from "../../contexts";
import { Button } from "@mui/material";

export const TestPage = () => {
	const { setCurrentUser } = useContext(AuthContext);
	return (
		<>
			<div>TestPage</div>
			<Button onClick={() => setCurrentUser(null)}>logout</Button>
		</>
	);
};
