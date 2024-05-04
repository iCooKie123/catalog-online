import { Button } from "@mui/material";
import axios from "@/axios";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts";

export const TestPage = () => {
	const [isError, setIsError] = useState(false);
	const { currentUser } = useContext(AuthContext);
	const testToken = () => {
		axios
			.get("users/validate-token")
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error.response.data);
				setIsError(true);
			});
	};

	return (
		<>
			<div>TestPage</div>
			<Button onClick={() => testToken()}>TestToken</Button>
			{isError && (
				<div style={{ backgroundColor: "red" }}>Token is invalid</div>
			)}
			<Button onClick={() => console.log(currentUser?.role)}>Role</Button>
		</>
	);
};
