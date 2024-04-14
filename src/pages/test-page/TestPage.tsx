import { Button } from "@mui/material";
import axios from "@/axios";
import { useState } from "react";

export const TestPage = () => {
	const [isError, setIsError] = useState(false);
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
		</>
	);
};
